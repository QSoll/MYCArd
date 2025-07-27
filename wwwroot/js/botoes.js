window.addEventListener("DOMContentLoaded", () => {
  const cardHorizontal = document.querySelector(".grid-card-horizontal-1");
  const cardVertical = document.querySelector(".grid-card-vertical-1");

  function salvarImagem(cardElemento, nomeArquivo) {
    html2canvas(cardElemento).then(canvas => {
      const link = document.createElement("a");
      link.download = nomeArquivo;
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
    });
  }

  async function salvarPDF(cardElemento, nomeArquivo) {
    const canvas = await html2canvas(cardElemento);
    const imgData = canvas.toDataURL("image/jpeg");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const posY = imgHeight < pageHeight ? (pageHeight - imgHeight) / 2 : 10;

    pdf.addImage(imgData, "JPEG", 0, posY, imgWidth, imgHeight);
    pdf.save(nomeArquivo);
  }

  function compartilharCard(cardElemento, nomeArquivo, titulo, texto) {
    if (!navigator.canShare) {
      alert("Compartilhamento não disponível neste dispositivo.");
      return;
    }

    html2canvas(cardElemento).then(canvas => {
      canvas.toBlob(blob => {
        const file = new File([blob], nomeArquivo, { type: "image/png" });
        navigator.share({
          files: [file],
          title: titulo,
          text: texto
        }).catch(err => {
          console.error("Erro ao compartilhar:", err);
          alert("Não foi possível compartilhar.");
        });
      });
    });
  }

  // Card Vertical
  document.getElementById("card-salvar-jpg-vertical-1")?.addEventListener("click", () => {
    if (cardVertical) salvarImagem(cardVertical, "meu-card-vertical.jpg");
  });

  document.getElementById("card-salvar-pdf-vertical-1")?.addEventListener("click", () => {
    if (cardVertical) salvarPDF(cardVertical, "meu-card-vertical.pdf");
  });

  document.getElementById("card-compartilhar-vertical-1")?.addEventListener("click", () => {
    if (cardVertical) {
      compartilharCard(cardVertical, "card-vertical.png", "Meu Card Vertical", "Confira meu cartão digital!");
    }
  });

  // Card Horizontal
  document.getElementById("card-salvar-jpg-horizontal-1")?.addEventListener("click", () => {
    if (cardHorizontal) salvarImagem(cardHorizontal, "meu-card-horizontal.jpg");
  });

  document.getElementById("card-salvar-pdf-horizontal-1")?.addEventListener("click", () => {
    if (cardHorizontal) salvarPDF(cardHorizontal, "meu-card-horizontal.pdf");
  });

  document.getElementById("card-compartilhar-horizontal-1")?.addEventListener("click", () => {
    if (cardHorizontal) {
      compartilharCard(cardHorizontal, "card-horizontal.png", "Meu Card Horizontal", "Confira meu cartão digital!");
    }
  });
});

