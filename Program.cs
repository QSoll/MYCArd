using Microsoft.OpenApi.Models;
using MyCArd.Models;

Environment.SetEnvironmentVariable("ASPNETCORE_URLS", "http://+:80");



var builder = WebApplication.CreateBuilder(args);

// OpenAPI + Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "MyCArd API",
        Version = "v1",
        Description = "API para cartão digital personalizado"
    });
});

var app = builder.Build();

// Ativa Swagger na fase de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Permite servir arquivos estáticos da pasta wwwroot
app.UseStaticFiles();

// Dicionário de cartões
var cartoes = new Dictionary<string, Cartao>
{
    ["sol-morcillo"] = new Cartao
    {
        Nome = "Sol Morcillo",
        Bio = "Webdeveloper, artista digital e criadora do app MyCArd",
        AvatarUrl = "/avatars/solange.png",
        Email = "sol.morcillo.dev@gmail.com",
        Instagram = "https://instagram.com/solart",
        GitHub = "https://github.com/solmorcillo",
        LinkedIn = "https://linkedin.com/in/solmorcillo",
        WhatsApp = "https://wa.me/5528999452754"
    }
};

// Rota para visualizar o cartão
app.MapGet("/cartao/{nome}", (string nome) =>
{
    var chave = nome.ToLower().Replace(" ", "-");

    if (!cartoes.ContainsKey(chave))
        return Results.NotFound("Cartão não encontrado.");

    var c = cartoes[chave];

    var html = $"""
    <!DOCTYPE html>
    <html>
    <head>
        <title>{c.Nome} – MyCArd</title>
        <link rel="stylesheet" href="/css/site.css">
    </head>
    <body>
        <div class="card">
            <img src="{c.AvatarUrl}" class="avatar" alt="Avatar">
            <h2>{c.Nome}</h2>
            <p class="bio">{c.Bio}</p>
            <a href="mailto:{c.Email}">✉️ {c.Email}</a>
            <a href="{c.GitHub}" target="_blank">GitHub</a>
            <a href="{c.Instagram}" target="_blank">Instagram</a>
            <a href="{c.LinkedIn}" target="_blank">LinkedIn</a>
            <a href="{c.WhatsApp}" target="_blank">WhatsApp</a>
            <button class="compartilhar" onclick="navigator.clipboard.writeText(window.location.href)">🔗 Copiar link</button>
        </div>
    </body>
    </html>
    """;

    return Results.Text(html, "text/html");
});

// Upload genérico de avatar
app.MapPost("/cartao/avatar", async (HttpRequest request) =>
{
    var form = await request.ReadFormAsync();
    var file = form.Files["avatar"];
    if (file is null || file.Length == 0) return Results.BadRequest("Nenhum arquivo enviado.");

    var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/avatars");
    Directory.CreateDirectory(uploads);

    var fileName = Path.GetFileName(file.FileName);
    var filePath = Path.Combine(uploads, fileName);

    using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream);

    var url = $"/avatars/{fileName}";

    var html = $"""
    <!DOCTYPE html>
    <html>
    <head><title>Upload feito</title></head>
    <body style="text-align:center; font-family:sans-serif; padding:40px">
        <h2>✅ Avatar enviado!</h2>
        <img src="{url}" style="width:120px; border-radius:50%; border:4px solid #eee">
        <p>Arquivo salvo como <code>{fileName}</code></p>
        <a href="/cartao/sol-morcillo" style="background:#0077cc; color:white; padding:10px 20px; border-radius:8px; text-decoration:none">Ver Cartão</a>
    </body>
    </html>
    """;

    return Results.Text(html, "text/html");
});

// Upload vinculado ao nome
app.MapPost("/cartao/{nome}/avatar", async (HttpRequest request, string nome) =>
{
    var chave = nome.ToLower().Replace(" ", "-");

    if (!cartoes.ContainsKey(chave))
        return Results.NotFound("Cartão não encontrado.");

    var form = await request.ReadFormAsync();
    var file = form.Files["avatar"];
    if (file is null || file.Length == 0) return Results.BadRequest("Nenhum arquivo enviado.");

    var uploads = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/avatars");
    Directory.CreateDirectory(uploads);

    var fileName = Path.GetFileName(file.FileName);
    var filePath = Path.Combine(uploads, fileName);

    using var stream = new FileStream(filePath, FileMode.Create);
    await file.CopyToAsync(stream);

    var url = $"/avatars/{fileName}";
    cartoes[chave].AvatarUrl = url;

    var html = $"""
    <html>
    <body style="font-family:sans-serif; text-align:center; padding:40px">
        <h2>✅ Avatar atualizado para <code>{nome}</code></h2>
        <img src="{url}" style="width:120px; border-radius:50%; border:4px solid #eee">
        <p>Veja seu novo cartão 👇</p>
        <a href="/cartao/{chave}" style="background:#0077cc; color:white; padding:10px 20px; border-radius:8px; text-decoration:none">Ver Cartão</a>
    </body>
    </html>
    """;

    return Results.Text(html, "text/html");
});

// Página inicial para preenchimento
app.MapGet("/", () =>
{
    var html = File.ReadAllText("wwwroot/preencher-cartao.html");
    return Results.Text(html, "text/html");
});

app.Run();
