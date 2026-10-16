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