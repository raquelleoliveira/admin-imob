// ===== Sidebar recolhível =====
const app = document.querySelector('.app');
const botaoToggleSidebar = document.querySelector('#toggle-sidebar');
const iconeToggleSidebar = botaoToggleSidebar.querySelector('i');

function alternarSidebar() {
  app.classList.toggle('sidebar-recolhida');

  if (app.classList.contains('sidebar-recolhida')) {
    iconeToggleSidebar.classList.replace('ti-chevrons-left', 'ti-chevrons-right');
    botaoToggleSidebar.setAttribute('aria-label', 'Expandir menu');
  } else {
    iconeToggleSidebar.classList.replace('ti-chevrons-right', 'ti-chevrons-left');
    botaoToggleSidebar.setAttribute('aria-label', 'Recolher menu');
  }
}

botaoToggleSidebar.addEventListener('click', alternarSidebar);

// ===== Mostrar/ocultar senha =====
const botoesOlho = document.querySelectorAll('.campo-senha button');

function alternarSenha(event) {
  const botao = event.currentTarget;
  const campo = botao.previousElementSibling;
  const icone = botao.querySelector('i');

  if (campo.getAttribute('type') === 'password') {
    campo.setAttribute('type', 'text');
    icone.classList.replace('ti-eye', 'ti-eye-off');
    botao.setAttribute('aria-label', 'Ocultar senha');
  } else {
    campo.setAttribute('type', 'password');
    icone.classList.replace('ti-eye-off', 'ti-eye');
    botao.setAttribute('aria-label', 'Mostrar senha');
  }
}

botoesOlho.forEach((botao) => botao.addEventListener('click', alternarSenha));


// ===== Confirmação da nova senha =====
const campoNovaSenha = document.querySelector('#novaSenha');
const campoConfirmarSenha = document.querySelector('#confirmarSenha');

function conferirSenhas() {
  if (campoConfirmarSenha.value !== campoNovaSenha.value) {
    campoConfirmarSenha.setCustomValidity('As senhas não conferem.');
  } else {
    campoConfirmarSenha.setCustomValidity('');
  }
}

if (campoNovaSenha && campoConfirmarSenha) {
  campoNovaSenha.addEventListener('input', conferirSenhas);
  campoConfirmarSenha.addEventListener('input', conferirSenhas);
}
