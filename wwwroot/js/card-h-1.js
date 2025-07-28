document.addEventListener('DOMContentLoaded', function () {
  const session = sessionStorage;

  // Estilo do card horizontal
  document.body.style.backgroundColor = session.getItem('bgColor') || '#f0f0f0';

  // Foto de perfil
  const profileImg = document.getElementById('profile-img');
  if (profileImg) {
    profileImg.src = session.getItem('profileImg') || 'default-profile.png';
  }

  // Dados do perfil
  const fullName = document.getElementById('full-name');
  const userName = document.getElementById('user-name');
  const bio = document.getElementById('bio');

  if (fullName) fullName.textContent = session.getItem('fullName') || '';
  if (userName) userName.textContent = session.getItem('userName') || '';
  if (bio) bio.textContent = session.getItem('bio') || '';

  // Ícones sociais
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach((icon) => {
    const platform = icon.dataset.platform;
    const url = session.getItem(`${platform}Url`);
    if (url) {
      icon.href = url;
      icon.style.display = 'inline-block';
    } else {
      icon.style.display = 'none';
    }
  });
});
