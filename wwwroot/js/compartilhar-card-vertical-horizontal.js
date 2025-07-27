document.addEventListener("DOMContentLoaded", function () {
  const dados = JSON.parse(sessionStorage.getItem("dadosCartao"));
  const corCartao = sessionStorage.getItem("corCartao");

  if (!dados) return;

  // 🖼️ Definir imagem nos dois cards
  const fotoHorizontal = document.getElementById("foto-perfil-h-1");
  const fotoVertical = document.getElementById("usuario-foto-v-1");



 const src = dados.foto?.startsWith("data:image")
  ? dados.foto
  : `img/uploads/${dados.foto}`;

if (dados.foto) {
  if (fotoHorizontal) {
    fotoHorizontal.src = src;
    fotoHorizontal.style.display = "block";
  }
  if (fotoVertical) {
    fotoVertical.src = src;
    fotoVertical.style.display = "block";
  }
} else {
  if (fotoHorizontal) fotoHorizontal.style.display = "none";
  if (fotoVertical) fotoVertical.style.display = "none";
}



  // 🎨 Aplicar cor de fundo nas grids dos cards
  const gridHorizontal = document.querySelector(".grid-card-horizontal-1");
  const gridVertical = document.querySelector(".grid-card-vertical-1");

  if (gridHorizontal && corCartao) gridHorizontal.style.backgroundColor = corCartao;
  if (gridVertical && corCartao) gridVertical.style.backgroundColor = corCartao;

  // ✏️ Preencher campos dos dois cards
  preencherDadosHorizontal(dados);
  preencherDadosVertical(dados);
});

// 🔧 Função para mostrar/ocultar ícones conforme preenchimento
function preencherCampoFlexivel(idCampo, dado, idIcone) {
  const campo = document.getElementById(idCampo);
  const icone = document.getElementById(idIcone);

  if (campo) campo.textContent = dado || "";
  if (icone) icone.style.display = dado ? "inline-block" : "none";
}

// 📦 Card Horizontal
function preencherDadosHorizontal(dados) {
  document.getElementById("usuario-nome-h-1").textContent = dados.nome || "";
  document.getElementById("usuario-whatsapp-h-1").textContent = dados.whatsapp || "";
  document.getElementById("usuario-site-h-1").textContent = dados.site || "";
  document.getElementById("usuario-email-h-1").textContent = dados.email || "";
  document.getElementById("usuario-graduacao-h-1").textContent = dados.graduacao || "";
  document.getElementById("usuario-cargo-h-1").textContent = dados.cargo || "";
  document.getElementById("usuario-descricao-h-1").textContent = dados.descricao || "";

  preencherCampoFlexivel("usuario-linkedin-h-1", dados.linkedin, "icone-linkedin-h-1");
  preencherCampoFlexivel("usuario-github-h-1", dados.github, "icone-github-h-1");
  preencherCampoFlexivel("usuario-instagram-h-1", dados.instagram, "icone-instagram-h-1");
  preencherCampoFlexivel("usuario-threads-h-1", dados.threads, "icone-threads-h-1");
  preencherCampoFlexivel("usuario-youtube-h-1", dados.youtube, "icone-youtube-h-1");
  preencherCampoFlexivel("usuario-facebook-h-1", dados.facebook, "icone-facebook-h-1");
}

// 📦 Card Vertical
function preencherDadosVertical(dados) {
  document.getElementById("usuario-nome-v-1").textContent = dados.nome || "";
  document.getElementById("usuario-whatsapp-v-1").textContent = dados.whatsapp || "";
  document.getElementById("usuario-site-v-1").textContent = dados.site || "";
  document.getElementById("usuario-email-v-1").textContent = dados.email || "";
  document.getElementById("usuario-graduacao-v-1").textContent = dados.graduacao || "";
  document.getElementById("usuario-cargo-v-1").textContent = dados.cargo || "";
  document.getElementById("usuario-descricao-v-1").textContent = dados.descricao || "";

  preencherCampoFlexivel("usuario-linkedin-v-1", dados.linkedin, "icone-linkedin-v-1");
  preencherCampoFlexivel("usuario-github-v-1", dados.github, "icone-github-v-1");
  preencherCampoFlexivel("usuario-instagram-v-1", dados.instagram, "icone-instagram-v-1");
  preencherCampoFlexivel("usuario-threads-v-1", dados.threads, "icone-threads-v-1");
  preencherCampoFlexivel("usuario-youtube-v-1", dados.youtube, "icone-youtube-v-1");
  preencherCampoFlexivel("usuario-facebook-v-1", dados.facebook, "icone-facebook-v-1");
}
