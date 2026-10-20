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