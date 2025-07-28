# MYCArd

<a href="https://solmorcillo.com.br/MyCArd/wwwroot/index.html"></a>
Gerador de cartão de apresentação em png, jpg, pdf. Pode ser compartilhado ou usado como assinatura em e-mail.

Cartão Digital Personalizado
Projeto web responsivo para criar, visualizar e salvar cartões digitais em formato PNG com fundo transparente. Os cartões apresentam avatar, informações pessoais e links sociais, com opção de layout vertical ou horizontal.

✨ Funcionalidades
Preenchimento automático de campos via sessionStorage

Upload com pré-visualização de imagem de perfil

Escolha de cor de fundo

Visualização dos cartões nos dois formatos

Botões para salvar os cards como PNG transparente

Layout adaptado para múltiplos dispositivos

📁 Estrutura de arquivos
Arquivo	Função principal
index.html	Página inicial com campos de entrada
compartilhar-cards-vertical-horizontal.html	Visualização dos cards nos dois formatos
salvar.js	Lógica de preenchimento, salvamento e eventos
style.css	Estilização dos cards e botões
html2canvas (lib externa)	Captura de imagem dos cards
🧠 Scripts principais (salvar.js)
Preenchimento dos campos
js
const campos = [ /* nome, cargo, graduacao, etc */ ];
// Lê sessionStorage e atualiza campos dinamicamente
Upload e preview da imagem
js
avatarInput.addEventListener("change", function () {
  // Lê imagem e exibe preview
});
Visualizar card
js
window.salvarDadosEVisualizar = function () {
  // Salva dados no sessionStorage e navega para a tela de preview
};
Salvar PNG transparente
js
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
Eventos dos botões
js
document.getElementById("card-salvar-png-horizontal-1").addEventListener("click", () => {
  const cardH = document.querySelector(".grid-card-horizontal-1");
  salvarCardComoPNG(cardH, "card-horizontal.png");
});

document.getElementById("card-salvar-png-vertical-1").addEventListener("click", () => {
  const cardV = document.querySelector(".grid-card-vertical-1");
  salvarCardComoPNG(cardV, "card-vertical.png");
});
🧼 Estilo (CSS)
css
.grid-card-horizontal-1,
.grid-card-vertical-1 {
  background-color: transparent;
}
📦 Dependência externa
html2canvas — biblioteca JavaScript para capturar DOM como imagem

Cartão Digital Personalizado
Projeto web responsivo para criar, visualizar e salvar cartões digitais em formato PNG com fundo transparente. Os cartões apresentam avatar, informações pessoais e links sociais, com opção de layout vertical ou horizontal.

✨ Funcionalidades
Preenchimento automático de campos via sessionStorage

Upload com pré-visualização de imagem de perfil

Escolha de cor de fundo

Visualização dos cartões nos dois formatos

Botões para salvar os cards como PNG com fundo transparente

Layout adaptado para múltiplos dispositivos

🧰 Tecnologias Utilizadas
Tecnologia	Uso no Projeto
HTML5	Estrutura semântica das páginas, campos, botões e containers dos cards
CSS3	Estilização dos cards, fundo transparente, layout flexível e visual responsivo
JavaScript	Interatividade, lógica dos botões, manipulação do DOM e controle de dados
sessionStorage	Armazenamento temporário dos dados inseridos no formulário do cartão
html2canvas	Biblioteca para transformar elementos HTML em imagem PNG com fundo transparente
Netlify	Hospedagem gratuita do projeto com deploy contínuo e acesso público
📁 Estrutura de arquivos
Arquivo	Descrição
index.html	Página inicial com campos para preencher dados
compartilhar-cards-vertical-horizontal.html	Tela de visualização dos cards gerados
salvar.js	Script com lógica de preenchimento, salvamento e eventos
style.css	Estilo dos cards e aplicação da transparência
html2canvas.min.js (lib externa via CDN)	Captura visual do card para download em PNG
⚙️ Scripts principais (salvar.js)
Preenchimento dos campos
js
const campos = [ /* nome, cargo, graduacao, etc */ ];
// Lê sessionStorage e atualiza campos dinamicamente
Upload e preview da imagem
js
avatarInput.addEventListener("change", function () {
  // Lê imagem do usuário e exibe no preview
});
Visualizar card
js
window.salvarDadosEVisualizar = function () {
  // Salva dados no sessionStorage e navega para a tela de visualização
};
Salvar PNG com fundo transparente
js
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
Eventos dos botões
js
document.getElementById("card-salvar-png-horizontal-1").addEventListener("click", () => {
  const cardH = document.querySelector(".grid-card-horizontal-1");
  salvarCardComoPNG(cardH, "card-horizontal.png");
});

document.getElementById("card-salvar-png-vertical-1").addEventListener("click", () => {
  const cardV = document.querySelector(".grid-card-vertical-1");
  salvarCardComoPNG(cardV, "card-vertical.png");
});
🎨 Estilo com fundo transparente (style.css)
css
.grid-card-horizontal-1,
.grid-card-vertical-1 {
  background-color: transparent;
}
📦 Dependência externa
html2canvas – transforma elementos HTML visíveis em imagens que podem ser baixadas

html
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
🚀 Hospedagem com Netlify
O projeto pode ser publicado gratuitamente usando o Netlify com:

Deploy automático arrastando a pasta

URL personalizada

Atualizações em tempo real

✍️ Créditos
Feito com carinho por Solange 🌻 Codificado com apoio do Copilot 💙 E aberta para crescer com os próximos modelos e com as próximas ideias!

<img src="https://solmorcillo.com.br/](https://solmorcillo.com.br/imgs_public/logo_SM.jpg">
