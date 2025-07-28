const logotipoMap = {
  email: "mailto:",
  facebook: "https://facebook.com/",
  github: "https://github.com/",
  instagram: "https://instagram.com/",
  linkedin: "https://linkedin.com/in/",
  threads: "https://threads.net/",
  whatsapp: "https://wa.me/",
  youtube: "https://youtube.com/",
  outro: ""
};

// Atualiza uma linha com base no logotipo escolhido
function atualizarLinha(linha) {
  const seletor = linha.querySelector(".logo-select");
  const campoTexto = linha.querySelector("input[type='text']");
  const valor = seletor.value;

  // Remove ícone anterior
  const iconeExistente = linha.querySelector(".icone-logotipo");
  if (iconeExistente) iconeExistente.remove();

 // Adiciona ícone e link base
if (valor && valor !== "outro") {
  campoTexto.value = logotipoMap[valor];

  const icone = document.createElement("img");
  icone.src = `/imgs/${valor}.png`;
  icone.alt = valor;
  icone.className = "icone-logotipo";
  icone.style.cssText = "width: 24px; height: 24px; margin-left: 8px;";

  // Fallback caso a imagem não seja encontrada
  icone.onerror = () => {
    console.error(`Imagem não encontrada: ${valor}.png`);
    icone.src = "/imgs/MyCard.png"; // imagem genérica, se desejar
    icone.alt = "Imagem padrão";
  };

  linha.insertBefore(icone, campoTexto);
}

  // Upload personalizado
  let upload = linha.querySelector(".upload-personalizado");
  if (!upload) {
    upload = document.createElement("input");
    upload.type = "file";
    upload.className = "upload-personalizado";
    upload.style.display = "none";
    linha.appendChild(upload);
  }
  upload.style.display = valor === "outro" ? "block" : "none";
}

// Aplica eventos a todas as linhas existentes
function aplicarEventos() {
  document.querySelectorAll(".linha-user-opcoes").forEach(linha => {
    const seletor = linha.querySelector(".logo-select");
    if (seletor) {
      seletor.addEventListener("change", () => atualizarLinha(linha));
    }
  });
}

// Botão para adicionar nova linha
document.getElementById("adicionar-linha").addEventListener("click", () => {
  const container = document.getElementById("linhas-container");
  const novaLinha = document.createElement("div");
  novaLinha.className = "linha-user-opcoes";
  novaLinha.innerHTML = `
    <label>Logo da nova linha:</label>
    <select class="logo-select" aria-label="Logo da nova linha">
      <option value="">Logo</option>
      <option value="email">Email</option>
      <option value="facebook">Facebook</option>
      <option value="github">Github</option>
      <option value="instagram">Instagram</option>
      <option value="linkedin">LinkedIn</option>
      <option value="threads">Threads</option>
      <option value="whatsapp">Whatsapp</option>
      <option value="youtube">Youtube</option>
      <option value="outro">Outro</option>
    </select>

    <label>Colunas:</label>
    <select class="colunas-select" aria-label="Colunas da nova linha">
      <option value="">Linhas</option>
      <option value="1">1</option>
      <option value="2">2</option>
    </select>

    <input type="text" placeholder="Conteúdo da nova linha" aria-label="Conteúdo da nova linha">
  `;
  container.appendChild(novaLinha);
  aplicarEventos();
});

// Inicializa eventos nas linhas existentes
aplicarEventos();
