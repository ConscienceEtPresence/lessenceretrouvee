/* ============================================================
   NAV.JS — Menu global « Sommaire » (L'essence retrouvée)
   Bouton flottant + panneau, injectés sur chaque page.
   Bilingue : détecte /en/ ; les liens relatifs résolvent
   dans les deux langues (mêmes noms de fichiers).
   ============================================================ */
(function(){
  var segs = location.pathname.split('/');
  var isEN = segs.indexOf('en') !== -1 && segs[segs.length - 2] === 'en';

  var T = isEN ? {
    open:'Contents', close:'Close', label:'Site menu', home:'Home',
    groups:[
      ['Begin', [
        ['parcours-decouverte.html','Discovery path'],
        ['chemin.html','The guided path'],
        ['causeries.html','The talks'],
        ['douze-notions.html','The 12 key notions'],
        ['lessence.html','The question of essence']
      ]],
      ['Place', [
        ['situer.html','Place Almaas and his sources'],
        ['lapproche.html','The Diamond Approach'],
        ['lhomme.html','The man and the path']
      ]],
      ['Deepen', [
        ['approfondir-almaas.html','Deepening Almaas'],
        ['la-carte.html','The general map'],
        ['schemas-oeuvre.html','Diagrams of the work'],
        ['ouvrages.html','The book library'],
        ['lexiques-ouvrages.html','Book-by-book lexicons'],
        ['glossaire.html','The bilingual glossary'],
        ['lire-almaas.html','Reading Almaas']
      ]]
    ]
  } : {
    open:'Sommaire', close:'Fermer', label:'Menu du site', home:'Accueil',
    groups:[
      ['Commencer', [
        ['parcours-decouverte.html','Parcours découverte'],
        ['chemin.html','Le chemin guidé'],
        ['causeries.html','Les causeries'],
        ['douze-notions.html','Les 12 notions clés'],
        ['lessence.html','La question de l’essence']
      ]],
      ['Situer', [
        ['situer.html','Situer Almaas et ses sources'],
        ['lapproche.html','L’approche Diamant'],
        ['lhomme.html','L’homme et le parcours']
      ]],
      ['Approfondir', [
        ['approfondir-almaas.html','Approfondir Almaas'],
        ['la-carte.html','La carte générale'],
        ['schemas-oeuvre.html','Les schémas de l’œuvre'],
        ['ouvrages.html','La bibliothèque des ouvrages'],
        ['lexiques-ouvrages.html','Les lexiques par ouvrage'],
        ['glossaire.html','Le glossaire bilingue'],
        ['lire-almaas.html','Lire Almaas']
      ]]
    ]
  };

  var here = segs[segs.length - 1] || 'index.html';

  /* ---- bouton flottant ---- */
  var btn = document.createElement('button');
  btn.id = 'er-nav-btn';
  btn.type = 'button';
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="er-nav-ic" aria-hidden="true">☷</span>' + T.open;

  /* ---- panneau ---- */
  var back = document.createElement('div');
  back.id = 'er-nav-back';
  var panel = document.createElement('div');
  panel.id = 'er-nav-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', T.label);

  var html = '<button id="er-nav-close" type="button" aria-label="' + T.close + '">×</button>';
  html += '<a class="er-nav-home" href="index.html">☷ ' + T.home + '</a>';
  html += '<div class="er-nav-cols">';
  T.groups.forEach(function(gr){
    html += '<section><h2>' + gr[0] + '</h2>';
    gr[1].forEach(function(it){
      var cur = (it[0] === here) ? ' aria-current="page"' : '';
      html += '<a href="' + it[0] + '"' + cur + '>' + it[1] + '</a>';
    });
    html += '</section>';
  });
  html += '</div>';
  panel.innerHTML = html;

  /* ---- styles ---- */
  var css = document.createElement('style');
  css.textContent =
    '#er-nav-btn{position:fixed;bottom:20px;right:20px;z-index:960;cursor:pointer;' +
      'display:flex;align-items:center;gap:.5rem;padding:.5rem .95rem;' +
      'background:#fffdf8;border:1px solid rgba(163,120,31,.45);border-radius:999px;' +
      'font-family:Inter,ui-sans-serif,system-ui,sans-serif;font-size:.8rem;font-weight:600;' +
      'letter-spacing:.06em;color:#232c4a;box-shadow:0 6px 20px rgba(35,44,74,.14);transition:all .18s ease;}' +
    '#er-nav-btn:hover{color:#8a6a1f;border-color:rgba(163,120,31,.75);transform:translateY(-2px);}' +
    '#er-nav-btn .er-nav-ic{color:#a3781f;font-size:.95rem;line-height:1;}' +
    '#er-nav-back{position:fixed;inset:0;z-index:970;background:rgba(6,9,16,.62);' +
      'backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .25s ease;}' +
    '#er-nav-back.open{opacity:1;pointer-events:auto;}' +
    '#er-nav-panel{position:fixed;top:0;right:0;bottom:0;z-index:980;width:min(30rem,90vw);overflow-y:auto;' +
      'background:radial-gradient(900px 500px at 90% -10%,rgba(232,201,122,.06),transparent 60%),#0a0e18;' +
      'color:#e9edf8;border-left:1px solid rgba(232,201,122,.25);box-shadow:-14px 0 44px rgba(0,0,0,.5);' +
      'padding:3.4rem 1.9rem 2.4rem;transform:translateX(102%);transition:transform .3s cubic-bezier(.4,0,.2,1);' +
      'font-family:\'Cormorant Garamond\',Georgia,serif;}' +
    '#er-nav-panel.open{transform:translateX(0);}' +
    '#er-nav-close{position:absolute;top:.9rem;right:1.1rem;background:none;border:none;cursor:pointer;' +
      'color:#7c88a8;font-size:1.9rem;line-height:1;padding:.2rem .4rem;transition:color .15s ease;}' +
    '#er-nav-close:hover{color:#f5d77b;}' +
    '#er-nav-panel .er-nav-home{display:inline-block;color:#dbe6f5;text-decoration:none;font-size:1.15rem;' +
      'margin-bottom:1.4rem;border-bottom:1px solid rgba(232,201,122,.3);padding-bottom:.15rem;}' +
    '#er-nav-panel .er-nav-home:hover{color:#f5d77b;}' +
    '#er-nav-panel section{margin-bottom:1.6rem;}' +
    '#er-nav-panel h2{font-family:Inter,sans-serif;font-size:.7rem;font-weight:600;letter-spacing:.16em;' +
      'text-transform:uppercase;color:#e8c97a;margin:0 0 .55rem;}' +
    '#er-nav-panel .er-nav-cols a{display:block;color:#aeb9d6;text-decoration:none;font-size:1.14rem;' +
      'padding:.36rem 0;border-bottom:1px solid rgba(255,255,255,.05);transition:color .15s ease;}' +
    '#er-nav-panel .er-nav-cols a:hover{color:#fff;}' +
    '#er-nav-panel .er-nav-cols a[aria-current="page"]{color:#f5d77b;}' +
    '@media (max-width:480px){#er-nav-btn{bottom:16px;right:12px;padding:.42rem .8rem;font-size:.75rem}' +
      '#er-nav-panel{padding:3rem 1.4rem 2rem}}';
  document.head.appendChild(css);

  /* ---- comportement ---- */
  var lastFocus = null;
  function openMenu(){
    lastFocus = document.activeElement;
    back.classList.add('open'); panel.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    var f = panel.querySelector('#er-nav-close'); if (f) f.focus();
    document.addEventListener('keydown', onKey);
  }
  function closeMenu(){
    back.classList.remove('open'); panel.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e){ if (e.key === 'Escape') closeMenu(); }

  btn.addEventListener('click', openMenu);
  back.addEventListener('click', closeMenu);
  panel.addEventListener('click', function(e){ if (e.target.id === 'er-nav-close') closeMenu(); });

  function mount(){
    document.body.appendChild(btn);
    document.body.appendChild(back);
    document.body.appendChild(panel);
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
