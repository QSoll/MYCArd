document.addEventListener("DOMContentLoaded", function () {
  // 🌈 Elementos principais
  const container = document.getElementById("degrade-container");
  const preview = document.getElementById("degrade-preview");
  const espacoInput = document.getElementById("espacamento");
  const adicionarCorBtn = document.getElementById("adicionar-cor");

  // ✅ Verifica se todos os elementos existem
  if (!container || !preview || !espacoInput || !adicionarCorBtn) return;

  let cores = [
    { inicio: "#ff0000", fim: "#0000ff" } // padrão inicial
  ];

  function criarSeletorCor(index) {
    const grupo = document.createElement("div");
    grupo.className = "grupo-cor";

    const inputInicio = document.createElement("input");
    inputInicio.type = "color";
    inputInicio.value = cores[index].inicio;
    inputInicio.addEventListener("input", () => {
      cores[index].inicio = inputInicio.value;
      atualizarPreview();
    });

    const inputFim = document.createElement("input");
    inputFim.type = "color";
    inputFim.value = cores[index].fim;
    inputFim.addEventListener("input", () => {
      cores[index].fim = inputFim.value;
      atualizarPreview();
    });

    grupo.appendChild(document.createTextNode(`Cor ${index + 1} – Início:`));
    grupo.appendChild(inputInicio);
    grupo.appendChild(document.createTextNode(` Fim:`));
    grupo.appendChild(inputFim);
    container.appendChild(grupo);
  }

  function atualizarPreview() {
    const espaco = parseFloat(espacoInput.value) || 20;
    const gradiente = `linear-gradient(to right, ${cores.map((c, i) => {
      const percent = (i + 1) * espaco;
      return `${c.inicio} ${percent - espaco}%, ${c.fim} ${percent}%`;
    }).join(", ")
      })`;

    preview.style.background = gradiente;
  }

  espacoInput.addEventListener("input", atualizarPreview);

  adicionarCorBtn.addEventListener("click", () => {
    cores.push({ inicio: "#00ff00", fim: "#ff00ff" });
    criarSeletorCor(cores.length - 1);
    atualizarPreview();
  });

  // 🚀 Inicialização
  cores.forEach((_, index) => criarSeletorCor(index));
  atualizarPreview();
});
