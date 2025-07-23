document.getElementById("cartao-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const nome = formData.get("nome") || "Sem nome";
  const bio = formData.get("bio") || "";
  const email = formData.get("email") || "";
  const github = formData.get("github") || "";
  const corTopo = formData.get("corTopo") || "#f0f0f0";
  const corBase = formData.get("corBase") || "#ffffff";
  const avatar = formData.get("avatar");
  const linkedin = formData.get("linkedin") || "";
  const instagram = formData.get("instagram") || "";
  const whatsapp = formData.get("whatsapp") || "";

  const preview = document.getElementById("cartao-preview");
  preview.innerHTML = `
    <div style="background:${corTopo}; padding:20px; border-radius:12px 12px 0 0; text-align:center;">
      <div id="avatar-preview"></div>
      <h2 style="margin-top:10px;">${nome}</h2>
    </div>
    <div style="background:${corBase}; padding:20px; border-radius:0 0 12px 12px;">
      ${bio ? `<p><em>${bio}</em></p>` : ""}
      ${email ? `<p>Email: <a href="mailto:${email}">${email}</a></p>` : ""}
      ${github ? `<p><img src="/imgs/logo_github.png" style="width:18px; vertical-align:middle;"> <a href="${github}" target="_blank">GitHub</a></p>` : ""}
      ${linkedin ? `<p><img src="/imgs/logo_linkedin.jpg" style="width:18px; vertical-align:middle;"> <a href="${linkedin}" target="_blank">LinkedIn</a></p>` : ""}
      ${instagram ? `<p><img src="/imgs/logo_instagram.png" style="width:18px; vertical-align:middle;"> <a href="${instagram}" target="_blank">Instagram</a></p>` : ""}
      ${whatsapp ? `<p><img src="/imgs/logo_whatsapp.png" style="width:18px; vertical-align:middle;"> <a href="${whatsapp}" target="_blank">WhatsApp</a></p>` : ""}
      <button onclick="salvarComoPDF()"> Salvar como PDF</button>
      <button onclick="salvarComoHTML()"> Salvar como HTML</button>
      <button onclick="exportarImagem()"> Exportar como imagem</button>
      <button onclick="adicionarMais()">Adicionar mais detalhes</button>
      <button onclick="copiarCartao()">Copiar cartão como assinatura</button>
      <button onclick="gerarAssinatura()"> Gerar assinatura Gmail</button>
      <button onclick="compartilharCartao()"> Compartilhar cartão</button>


    </div>
  `;
  preview.style.display = "block";

  if (avatar && avatar.size > 0) {
    const reader = new FileReader();
    reader.onload = function (event) {
      document.getElementById("avatar-preview").innerHTML = `
        <img src="${event.target.result}" class="avatar" alt="Avatar" style="width:120px; height:120px; border-radius:50%; object-fit:cover; border:4px solid #0077cc; box-shadow:0 0 8px rgba(0,0,0,0.1);">
      `;
    };
    reader.readAsDataURL(avatar);
  }
});

function adicionarMais() {
  alert("Você pode incluir LinkedIn, WhatsApp, fundo personalizado e mais! Em breve deixaremos isso dinâmico também.");
}

function copiarCartao() {
  const html = document.getElementById("cartao-preview").innerHTML;
  const temp = document.createElement("textarea");
  temp.value = html;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Cartão copiado! Agora é só colar no Gmail ou onde quiser");
}

function salvarComoPDF() {
  const cartao = document.getElementById("cartao-preview");
  const janela = window.open("", "_blank");
  const conteudo = `
    <html>
      <head>
        <title>Meu Cartão</title>
        <style>
          body { font-family: sans-serif; padding: 40px; }
          .avatar { width:120px; height:120px; border-radius:50%; object-fit:cover; border:4px solid #0077cc; box-shadow:0 0 8px rgba(0,0,0,0.1); }
        </style>
      </head>
      <body>
        ${cartao.innerHTML}
      </body>
    </html>
  `;
  janela.document.write(conteudo);
  janela.document.close();
  janela.print();
}

function salvarComoHTML() {
  const cartao = document.getElementById("cartao-preview");
  const conteudo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>Meu Cartão</title>
      <style>
        body { font-family: sans-serif; padding: 40px; }
        .avatar { width:120px; height:120px; border-radius:50%; object-fit:cover; border:4px solid #0077cc; box-shadow:0 0 8px rgba(0,0,0,0.1); }
      </style>
    </head>
    <body>
      ${cartao.innerHTML}
    </body>
    </html>
  `;
  const blob = new Blob([conteudo], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = "meu-cartao.html";
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

function exportarImagem() {
  const cartao = document.getElementById("cartao-preview");
  html2canvas(cartao).then(canvas => {
    const link = document.createElement("a");
    link.download = "meu-cartao.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

function gerarAssinatura() {
  const cartao = document.getElementById("cartao-preview");
  const html = cartao.innerHTML;
  const temp = document.createElement("textarea");
  temp.value = html;
  document.body.appendChild(temp);
  temp.select();
  document.execCommand("copy");
  document.body.removeChild(temp);
  alert("Assinatura copiada! Agora vá nas configurações do Gmail e cole na assinatura.");
}

function compartilharCartao() {
  const cartao = document.getElementById("cartao-preview");
  const conteudo = encodeURIComponent(cartao.innerHTML);
  
  const linkWhatsapp = `https://wa.me/?text=${conteudo}`;
  const linkEmail = `mailto:?subject=Meu Cartão Digital&body=${conteudo}`;

  const escolha = prompt("Compartilhar por:\n1️⃣ WhatsApp\n2️⃣ Email\nDigite 1 ou 2:");

  if (escolha === "1") {
    window.open(linkWhatsapp, "_blank");
  } else if (escolha === "2") {
    window.location.href = linkEmail;
  } else {
    alert("Opção inválida ou cancelada.");
  }
}


