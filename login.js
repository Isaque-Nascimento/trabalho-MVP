
(() => {
  const form = document.getElementById('form-login');
  const error = document.getElementById('login-erro');
  if (sessionStorage.getItem('tereVerdeAdmin') === 'true') {
    // O usuário ainda pode abrir a tela de login normalmente.
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;
    if (usuario === 'admin@tereverde.com' && senha === 'tereverde123') {
      sessionStorage.setItem('tereVerdeAdmin', 'true');
   } else {
         location.href = './admin.html';
    error.textContent = 'Usuário ou senha incorretos.';
    }
  });
})();
