const botaoToggleSenha = document.querySelector('#toggle-senha');
const campoSenha = document.querySelector('#senha');


function alternarSenha() {
    if (campoSenha.getAttribute('type') === 'password') {
        campoSenha.setAttribute('type', 'text');
    } else {
        campoSenha.setAttribute('type', 'password');
    }
}

botaoToggleSenha.addEventListener('click', alternarSenha);

const linkEsqueciSenha = document.querySelector('.esqueci-senha');
const linkVoltarLogin = document.querySelector('#voltar-login');
const modalSenha = document.querySelector('#modal-senha');

function abrirModal(event) {
    event.preventDefault();
    modalSenha.classList.add('ativo');
}

linkEsqueciSenha.addEventListener('click', abrirModal);

function fecharModal(event) {
    event.preventDefault();
    modalSenha.classList.remove('ativo');
}

linkVoltarLogin.addEventListener('click', fecharModal);