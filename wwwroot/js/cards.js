document.addEventListener('DOMContentLoaded', () => {
  preencherTodosOsCards();
});

function preencherTodosOsCards() {
  const campos = {
    nome: localStorage.getItem('usuarioNome') || '',
    email: localStorage.getItem('usuarioEmail') || '',
    cargo: localStorage.getItem('usuarioCargo') || '',
    telefone: localStorage.getItem('usuarioTelefone') || ''
  };

  const modelosSuportados = ['h-1', 'v-1', 'h-2', 'v-2']; // adicione mais aqui conforme necessário

  modelosSuportados.forEach(modelo => {
    for (const campo in campos) {
      const id = `usuario-${campo}-${modelo}`;
      const elemento = document.getElementById(id);
      if (elemento) {
        elemento.textContent = campos[campo];
      }
    }
  });
}

