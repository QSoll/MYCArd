document.getElementById("foto")?.addEventListener("change", function (event) {
  const preview = document.getElementById("preview-foto");
  const file = event.target.files[0];

  if (file && preview) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "150px";
      img.style.borderRadius = "8px";
      img.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
      preview.innerHTML = "";
      preview.appendChild(img);

      // Salvando no sessionStorage
      let dados = JSON.parse(sessionStorage.getItem("dadosCartao")) || {};
      dados.foto = e.target.result;
      sessionStorage.setItem("dadosCartao", JSON.stringify(dados));
    };
    reader.readAsDataURL(file);
  }
});
