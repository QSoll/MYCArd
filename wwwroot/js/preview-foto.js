document.getElementById('foto').addEventListener('change', function (event) {
  const preview = document.getElementById('preview-foto');
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;

      // Estilização da imagem
      img.style.maxWidth = '150px';
      img.style.borderRadius = '8px';
      img.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
      img.style.opacity = '0';

      // Efeito fade-in ao carregar
      img.onload = () => {
        img.style.transition = 'opacity 0.3s';
        img.style.opacity = '1';
      };

      // Limpa o preview anterior e adiciona nova imagem
      preview.innerHTML = '';
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
  }
});
