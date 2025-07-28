document.addEventListener("DOMContentLoaded", function () {
  const dados = JSON.parse(sessionStorage.getItem("dadosCartao")) || {};
  const corCartao = sessionStorage.getItem("corCartao");

  // 🌈 Aplica cor de fundo no card vertical
  const gridVertical = document.querySelector(".grid-card-vertical-1");
  if (gridVertical && corCartao) {
    gridVertical.style.backgroundColor = corCartao;
  }

  // 🖼️ Atualiza imagem do perfil
  const fotoVertical = document.getElementById("usuario-foto-v-1");
  const src = dados.foto?.startsWith("data:image")
    ? dados.foto
    : `img/uploads/${dados.foto}`;

  if (fotoVertical) {
    fotoVertical.src = dados.foto ? src : "";
    fotoVertical.style.display = dados.foto ? "block" : "none";
  }

  // 📦 Preenche campos do card vertical
  preencherDadosVertical(dados);
});

// 💬 Função para preencher campos sociais com ícones flexíveis
function preencherCampoFlexivel(idCampo, dado, idIcone) {
  const campo = document.getElementById(idCampo);
  const icone = document.getElementById(idIcone);

  if (campo) campo.textContent = dado || "";
  if (icone) icone.style.display = dado ? "inline-block" : "none";
}

// ✅ Preenche todos os dados do card vertical
function preencherDadosVertical(dados) {
  const camposSimples = [
    "nome", "whatsapp", "site", "email",
    "graduacao", "cargo", "descricao"
  ];

  camposSimples.forEach((id) => {
    const el = document.getElementById(`usuario-${id}-v-1`);
    if (el) el.textContent = dados[id] || "";
  });

  const sociais = ["linkedin", "github", "instagram", "threads", "youtube", "facebook"];
  sociais.forEach((id) => {
    preencherCampoFlexivel(`usuario-${id}-v-1`, dados[id], `icone-${id}-v-1`);
  });
}
