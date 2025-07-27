document.addEventListener("DOMContentLoaded", function () {
  const campos = [
    "nome", "cargo", "graduacao", "descricao", "whatsapp", "site", "email",
    "linkedin", "github", "instagram", "threads", "youtube", "facebook"
  ];

  const dados = JSON.parse(sessionStorage.getItem("dadosCartao")) || {};

  // Preenche os campos se houver dados salvos
  campos.forEach(function (id) {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = dados[id] || "";

      campo.addEventListener("input", function () {
        dados[id] = campo.value;
        sessionStorage.setItem("dadosCartao", JSON.stringify(dados));
      });
    }
  });

  const avatarInput = document.getElementById("avatar");
  const previewAvatar = document.getElementById("preview-avatar");

  // Mostrar prévia da imagem escolhida
  if (avatarInput) {
    avatarInput.addEventListener("change", function () {
      const file = avatarInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          dados.foto = e.target.result;
          sessionStorage.setItem("dadosCartao", JSON.stringify(dados));
          if (previewAvatar) previewAvatar.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Ao clicar em "Visualizar Card"
  window.salvarDadosEVisualizar = function () {
    const cor = document.getElementById("cor-fundo").value;
    dados.fundo = cor;

    // Se já temos a imagem no preview, usa ela; senão, tenta carregar
    if (avatarInput && avatarInput.files.length > 0) {
      const leitor = new FileReader();
      leitor.onload = function (e) {
        dados.foto = e.target.result;
        finalizarSalvamento(dados, cor);
      };
      leitor.readAsDataURL(avatarInput.files[0]);
    } else {
      finalizarSalvamento(dados, cor);
    }
  };

  function finalizarSalvamento(dados, cor) {
    sessionStorage.setItem("dadosCartao", JSON.stringify(dados));
    sessionStorage.setItem("corCartao", cor);
    window.location.href = "compartilhar-cards-vertical-horizontal.html";
  }
});


function salvarCardComoPNG(cardElemento, nomeArquivo = "card.png") {
  html2canvas(cardElemento, {
    backgroundColor: null // Garante fundo transparente
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = nomeArquivo;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

const botaoSalvarHorizontal = document.getElementById("card-salvar-png-horizontal-1");
if (botaoSalvarHorizontal) {
  botaoSalvarHorizontal.addEventListener("click", () => {
    const cardHorizontal = document.querySelector(".grid-card-horizontal-1");
    salvarCardComoPNG(cardHorizontal, "card-horizontal.png");
  });
}

const botaoSalvarVertical = document.getElementById("card-salvar-png-vertical-1");
if (botaoSalvarVertical) {
  botaoSalvarVertical.addEventListener("click", () => {
    const cardVertical = document.querySelector(".grid-card-vertical-1");
    salvarCardComoPNG(cardVertical, "card-vertical.png");
  });
}

