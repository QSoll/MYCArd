document.addEventListener("DOMContentLoaded", function () {
  // 🌟 1. Preencher campos com dados salvos
  const campos = [
    "nome", "cargo", "graduacao", "descricao", "whatsapp", "site", "email",
    "linkedin", "github", "instagram", "threads", "youtube", "facebook"
  ];

  const dados = JSON.parse(sessionStorage.getItem("dadosCartao")) || {};

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

  // 📸 2. Preview da imagem de avatar
  const avatarInput = document.getElementById("avatar");
  const previewAvatar = document.getElementById("preview-avatar");

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

  // 🧩 3. Gerenciar campos de coluna dupla (logotipo + texto)
  document.querySelectorAll(".colunas-select").forEach(function (select) {
    select.addEventListener("change", function (e) {
      const linha = e.target.id.replace("coluna", "");
      const parentDiv = e.target.closest(".linha-user-opcoes");

      parentDiv.querySelectorAll(".coluna-extra").forEach(el => el.remove());

      if (e.target.value === "2") {
        const novoSelect = document.createElement("select");
        novoSelect.name = `logo${linha}-extra`;
        novoSelect.className = "selector-mini logo-select coluna-extra";
        novoSelect.setAttribute("aria-label", `Logo da segunda coluna da linha ${linha}`);

        const icones = ["", "email", "facebook", "github", "instagram", "linkedin", "threads", "whatsapp", "youtube", "outro"];
        icones.forEach(icon => {
          const option = document.createElement("option");
          option.value = icon;
          option.textContent = icon ? icon.charAt(0).toUpperCase() + icon.slice(1) : "Logo";
          novoSelect.appendChild(option);
        });

        const inputArquivo = document.createElement("input");
        inputArquivo.type = "file";
        inputArquivo.accept = "image/*";
        inputArquivo.className = "upload-coluna-extra coluna-extra";
        inputArquivo.style.display = "none";

        novoSelect.addEventListener("change", function () {
          inputArquivo.style.display = novoSelect.value === "outro" ? "inline-block" : "none";
        });

        const novoInput = document.createElement("input");
        novoInput.type = "text";
        novoInput.name = `linha${linha}-extra`;
        novoInput.placeholder = `Linha ${linha} extra`;
        novoInput.className = "coluna-extra";
        novoInput.setAttribute("aria-label", `Conteúdo da segunda coluna da linha ${linha}`);

        parentDiv.appendChild(novoSelect);
        parentDiv.appendChild(inputArquivo);
        parentDiv.appendChild(novoInput);
      }
    });
  });

  // 🖼️ 4. Seletor principal de logotipo (linha inicial)
  const seletorLogo = document.getElementById("logo-principal");
  if (seletorLogo) {
    const inputUpload = document.createElement("input");
    inputUpload.type = "file";
    inputUpload.accept = "image/*";
    inputUpload.id = "upload-logo-principal";
    inputUpload.style.display = "none";

    seletorLogo.parentNode.appendChild(inputUpload);

    seletorLogo.addEventListener("change", function () {
      const valor = seletorLogo.value;

      if (valor === "Logo" || valor === "outro") {
        inputUpload.style.display = "inline-block";
        inputUpload.click();
      } else {
        inputUpload.style.display = "none";
      }
    });

    inputUpload.addEventListener("change", function () {
      const file = inputUpload.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          dados.logoPrincipal = e.target.result;
          sessionStorage.setItem("dadosCartao", JSON.stringify(dados));

          const previewAntigo = seletorLogo.parentNode.querySelector(".logo-preview");
          if (previewAntigo) previewAntigo.remove();

          const preview = document.createElement("img");
          preview.src = e.target.result;
          preview.className = "logo-preview";
          preview.style.maxHeight = "40px";
          preview.style.borderRadius = "6px";
          preview.style.boxShadow = "0 0 6px rgba(0,0,0,0.2)";
          preview.style.opacity = "0";
          preview.style.transition = "opacity 0.3s";

          preview.onload = () => {
            preview.style.opacity = "1";
          };

          seletorLogo.parentNode.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // 👁️ 5. Visualizar Card
  window.salvarDadosEVisualizar = function () {
    const cor = document.getElementById("cor-fundo").value;
    dados.fundo = cor;

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

// 🖼️ 6. Salvar card como imagem PNG
function salvarCardComoPNG(cardElemento, nomeArquivo = "card.png") {
  html2canvas(cardElemento, {
    backgroundColor: null
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