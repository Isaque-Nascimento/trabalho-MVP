
(() => {
  const KEY = 'tereVerdeConteudoV1';
  const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
  const page = location.pathname.split('/').pop();
  const data = saved[page];
  if (!data) return;
  Object.entries(data).forEach(([selector, html]) => {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = html;
  });
})();
