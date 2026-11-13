
(() => {    //função
  const KEY = 'tereVerdeConteudoV1'; // Criando variável
  const pages = {  //Criando Objeto (pages)
    'serradosorgaos.html': 'Serra dos Órgãos',
    'montanhateresopolis.html': 'Montanhas de Teresópolis',
    'trespicos.html': 'Três Picos'
  };
  const select = document.getElementById('pagina'); //Qual campo editar
  const frame = document.getElementById('preview'); //Exibe as pages no painel ADM
  const editBtn = document.getElementById('editar'); // botão Ativar e Desativar edição
  const saveBtn = document.getElementById('salvar'); // botão salvar alterações
  const status = document.getElementById('status');  // Status
  const selectors = ['.descricao', '.informacoes']; // Controle da edição
  let editing = false;

  Object.entries(pages).forEach(([file, label]) => {  //Lista
    const option = document.createElement('option');
    option.value = file;
    option.textContent = label;
    select.appendChild(option); // Adiciona as opções de pages
  });

  function setStatus(message, error=false) { 
    status.textContent = message;
    status.className = error ? 'status erro' : 'status';
  }
  function setEditing(value) {
    editing = value;
    try {  
      selectors.forEach(selector => {
        const el = frame.contentDocument.querySelector(selector);
        if (el) {
          el.contentEditable = value ? 'true' : 'false';
          el.classList.toggle('modo-edicao', value);
          el.querySelectorAll('*').forEach(child => {
            child.contentEditable = value ? 'true' : 'false';
          });
        }
      });
      editBtn.textContent = value ? 'Bloquear edição' : 'Editar informações';
      saveBtn.disabled = !value;
      setStatus(value ? 'Modo de edição ativado. Clique nos textos da prévia para alterá-los.' : 'Prévia em modo de leitura.');
    } catch (e) {
      setStatus('Não foi possível acessar a prévia. Abra o projeto pelo mesmo servidor local.', true);
    }
  }
  function loadPage() {
    setEditing(false);
    frame.src = './' + select.value;
    frame.onload = () => setEditing(false);
    setStatus('Página carregada. Clique em “Editar informações” para começar.');
  }
  select.addEventListener('change', loadPage);
  editBtn.addEventListener('click', () => setEditing(!editing));
  saveBtn.addEventListener('click', () => {
    if (!editing) return;
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      saved[select.value] = {};
      selectors.forEach(selector => {
        const el = frame.contentDocument.querySelector(selector);
        if (el) saved[select.value][selector] = el.innerHTML;
      });
      localStorage.setItem(KEY, JSON.stringify(saved));
      setEditing(false);
      setStatus('Alterações salvas neste navegador! Abra a página pública para conferir.');
    } catch (e) {
      setStatus('Erro ao salvar. Verifique se o navegador permite armazenamento local.', true);
    }
  });
  document.getElementById('sair').addEventListener('click', () => {
    sessionStorage.removeItem('tereVerdeAdmin');
    location.href = './login.html';
  });
  loadPage();
})();
