// card.js

document.addEventListener("DOMContentLoaded", function () {
  const nome = sessionStorage.getItem("nome");
  const bio = sessionStorage.getItem("bio");
  const email = sessionStorage.getItem("email");
  const telefone = sessionStorage.getItem("telefone");
  const avatar = sessionStorage.getItem("avatar");

  // Card Vertical
  document.querySelector(".card-vertical h2").textContent = nome;
  document.querySelector(".card-vertical p.bio").textContent = bio;
  document.querySelector(".card-vertical .email").textContent = email;
  document.querySelector(".card-vertical .telefone").textContent = telefone;
  document.querySelector(".card-vertical img").src = avatar;

  // Card Horizontal
  document.querySelector(".card-horizontal h2").textContent = nome;
  document.querySelector(".card-horizontal p.bio").textContent = bio;
  document.querySelector(".card-horizontal img").src = avatar;
});

