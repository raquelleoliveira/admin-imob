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