document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // 👉 Captura dos campos obrigatórios
    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();

    if (!nome || !email) {
      alert("Por favor, preencha pelo menos o nome e o email.");
      return;
    }

    // 📦 Captura dos campos opcionais
    const dadosCartao = {
      nome,
      email,
      cargo: document.getElementById("cargo")?.value || "",
      whatsapp: document.getElementById("whatsapp")?.value || "",
      graduacao: document.getElementById("graduacao")?.value || "",
      descricao: document.getElementById("descricao")?.value || "",
      site: document.getElementById("site")?.value || "",

      linkedin: document.getElementById("linkedin")?.value || "",
      github: document.getElementById("github")?.value || "",
      instagram: document.getElementById("instagram")?.value || "",
      threads: document.getElementById("threads")?.value || "",
      youtube: document.getElementById("youtube")?.value || "",
      facebook: document.getElementById("facebook")?.value || "",

      // Imagem (via campo oculto ou URL textual, conforme seu HTML)
      foto: document.getElementById("urlImagem")?.value || ""
    };

    // 💾 Salva no sessionStorage
    sessionStorage.setItem("dadosCartao", JSON.stringify(dadosCartao));

    // ➡️ Redireciona para o card
    window.location.href = "compartilhar-card-vertical.html";
  });
});
