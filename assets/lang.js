/* ============================================================
   LANG.JS — Bascule FR/EN (L'essence retrouvée / Essence Regained)
   Fonctionne à la racine d'un domaine OU dans un sous-dossier
   (GitHub Pages projet). FR : .../page.html — EN : .../en/page.html
   ============================================================ */
(function(){
  var KEY = 'er_lang';
  var segs = location.pathname.split('/');          // ex: ["","lessenceretrouvee","en","page.html"]
  var file = segs.pop();                             // "page.html" ou ""
  var isEN = segs[segs.length - 1] === 'en';

  function counterpartPath(){
    var s = segs.slice();
    if (isEN) s.pop(); else s.push('en');
    return s.join('/') + '/' + file + location.search + location.hash;
  }

  /* Préférence mémorisée : appliquée uniquement sur les pages d'accueil */
  try {
    var pref = localStorage.getItem(KEY);
    var atHome = (file === '' || file === 'index.html');
    if (atHome && pref === 'en' && !isEN){ location.replace(counterpartPath()); return; }
    if (atHome && pref === 'fr' && isEN){ location.replace(counterpartPath()); return; }
  } catch(e){}

  function choose(lang){
    try { localStorage.setItem(KEY, lang); } catch(e){}
    if ((lang === 'en') !== isEN) location.href = counterpartPath();
  }

  var box = document.createElement('div');
  box.id = 'lang-switch';
  box.setAttribute('role', 'navigation');
  box.setAttribute('aria-label', 'Language');

  var fr = document.createElement('a');
  fr.textContent = 'FR';
  fr.href = isEN ? counterpartPath() : '#';
  fr.setAttribute('lang', 'fr');
  fr.title = 'Version française';
  if (!isEN) fr.className = 'on';

  var sep = document.createElement('span');
  sep.textContent = '·';

  var en = document.createElement('a');
  en.textContent = 'EN';
  en.href = isEN ? '#' : counterpartPath();
  en.setAttribute('lang', 'en');
  en.title = 'English version';
  if (isEN) en.className = 'on';

  fr.addEventListener('click', function(e){ e.preventDefault(); choose('fr'); });
  en.addEventListener('click', function(e){ e.preventDefault(); choose('en'); });

  box.appendChild(fr);
  box.appendChild(sep);
  box.appendChild(en);

  var css = document.createElement('style');
  css.textContent =
    '#lang-switch{position:fixed;bottom:20px;left:20px;z-index:960;' +
    'display:flex;align-items:center;gap:.45rem;padding:.5rem .85rem;' +
    'background:#fffdf8;' +
    'border:1px solid rgba(163,120,31,.45);border-radius:999px;' +
    'font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:.8rem;font-weight:600;' +
    'letter-spacing:.06em;box-shadow:0 6px 20px rgba(35,44,74,.14);}' +
    '#lang-switch a{color:#8a8f9f;text-decoration:none;transition:color .15s ease;}' +
    '#lang-switch a:hover{color:#232c4a;}' +
    '#lang-switch a.on{color:#8a6a1f;pointer-events:none;}' +
    '#lang-switch span{color:rgba(35,44,74,.25);}' +
    '@media (max-width:480px){#lang-switch{bottom:16px;left:12px;padding:.42rem .7rem;font-size:.75rem}}';
  document.head.appendChild(css);

  function mount(){ document.body.appendChild(box); }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
