// 🛠️ Atualiza o visual do card horizontal (usado em layouts específicos)
function atualizarCardHorizontal(nome, email, whatsapp, descricao, foto, graduacao, cargo) {
  const card = document.querySelector(".card-horizontal");
  if (!card) return;

  // Nome
  const nomeEl = card.querySelector(".r-h1 h1");
  if (nomeEl) nomeEl.textContent = nome;

  // Telefone
  const telefoneEl = card.querySelector(".r-h2 h2");
  if (telefoneEl) {
    const whatsappIcon = `<img src="imgs/logo_whatsapp.png" class="logos-micro">`;
    telefoneEl.innerHTML = whatsapp ? `${whatsappIcon} ${whatsapp}` : "";
  }

  // Email
  const emailEl = card.querySelector(".r-h2 h3");
  if (emailEl) emailEl.textContent = email;

  // Bio / profissão
  const bio1 = card.querySelector(".r-h7 p");
  if (bio1) bio1.textContent = graduacao;

  const bio2 = card.querySelector(".r-h8 p");
  if (bio2) {
    if (cargo && descricao) {
      bio2.textContent = `${cargo} · ${descricao}`;
    } else {
      bio2.textContent = cargo || descricao || "";
    }
  }

  // Foto
  const imgEl = card.querySelector(".photo-format-horiz-1");
  if (imgEl) imgEl.src = foto;
}

// 🧩 Preenche o card horizontal com base nos IDs individuais
function preencherCardHorizontal(dados) {
  document.getElementById("foto-perfil-h-1").src = dados.foto || "";
  document.getElementById("usuario-nome-h-1").textContent = dados.nome || "";
  document.getElementById("usuario-whatsapp-h-1").textContent = dados.whatsapp || "";
  document.getElementById("usuario-site-h-1").textContent = dados.site || "";
  document.getElementById("usuario-email-h-1").textContent = dados.email || "";
  document.getElementById("usuario-linkedin-h-1").textContent = dados.linkedin || "";
  document.getElementById("usuario-github-h-1").textContent = dados.github || "";
  document.getElementById("usuario-instagram-h-1").textContent = dados.instagram || "";
  document.getElementById("usuario-threads-h-1").textContent = dados.threads || "";
  document.getElementById("usuario-youtube-h-1").textContent = dados.youtube || "";
  document.getElementById("usuario-facebook-h-1").textContent = dados.facebook || "";
  document.getElementById("usuario-graduacao-h-1").textContent = dados.graduacao || "";
  document.getElementById("usuario-cargo-h-1").textContent = dados.cargo || "";
  document.getElementById("usuario-descricao-h-1").textContent = dados.descricao || "";
}

// 🧩 Preenche o card vertical com base nos IDs individuais
function preencherCardVertical(dados) {
  document.getElementById("usuario-foto-v-1").src = dados.foto || "";
  document.getElementById("usuario-nome-v-1").textContent = dados.nome || "";
  document.getElementById("usuario-whatsapp-v-1").textContent = dados.whatsapp || "";
  document.getElementById("usuario-site-v-1").textContent = dados.site || "";
  document.getElementById("usuario-email-v-1").textContent = dados.email || "";
  document.getElementById("usuario-linkedin-v-1").textContent = dados.linkedin || "";
  document.getElementById("usuario-github-v-1").textContent = dados.github || "";
  document.getElementById("usuario-instagram-v-1").textContent = dados.instagram || "";
  document.getElementById("usuario-threads-v-1").textContent = dados.threads || "";
  document.getElementById("usuario-youtube-v-1").textContent = dados.youtube || "";
  document.getElementById("usuario-facebook-v-1").textContent = dados.facebook || "";
  document.getElementById("usuario-graduacao-v-1").textContent = dados.graduacao || "";
  document.getElementById("usuario-cargo-v-1").textContent = dados.cargo || "";
  document.getElementById("usuario-descricao-v-1").textContent = dados.descricao || "";
}

// 🚀 Inicialização única após carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  const dados = JSON.parse(sessionStorage.getItem("dadosCartao"));
  if (!dados) return;

  atualizarCardHorizontal(
    dados.nome,
    dados.email,
    dados.whatsapp,
    dados.descricao,
    dados.foto,
    dados.graduacao,
    dados.cargo
  );

  preencherCardHorizontal(dados);
  preencherCardVertical(dados);
});
