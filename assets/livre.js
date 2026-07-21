/* ============================================================
   LIVRE.JS — coque « lecture continue »
   Injecte : barre du haut · rail sommaire · précédent/suivant · progression.
   Une seule source de vérité : l'ordre des chapitres ci-dessous.
   Bilingue (FR racine / EN sous /en/), liens relatifs valides des deux côtés.
   ============================================================ */
(function(){
  var segs = location.pathname.split('/');
  var isEN = segs.indexOf('en') !== -1 && segs[segs.length - 2] === 'en';
  var here = (segs[segs.length - 1] || 'index.html');

  /* ordre de lecture = ordre du rail = chaînage précédent/suivant */
  var CH = [
    {id:'douze-notions.html',          g:['L’ouverture','Opening'],        t:['12 notions clés','12 key notions']},
    {id:'etre-ou-lon-est.html',        g:['Le chemin','The path'],         t:['Être où l’on est','Being where you are']},
    {id:'le-juge-interieur.html',      g:['Le chemin','The path'],         t:['Le juge intérieur','The inner judge']},
    {id:'les-trous.html',              g:['Le chemin','The path'],         t:['Les trous','The holes']},
    {id:'lessence.html',               g:['Le chemin','The path'],         t:['La question de l’essence','The question of essence']},
    {id:'les-visages-de-lessence.html',g:['Le chemin','The path'],         t:['Les visages de l’essence','The faces of essence']},
    {id:'la-perle.html',               g:['Le chemin','The path'],         t:['La Perle','The Pearl']},
    {id:'le-point.html',               g:['Le chemin','The path'],         t:['Le Point','The Point']},
    {id:'l-immensite.html',            g:['Le chemin','The path'],         t:['L’immensité','The immensity']},
    {id:'pratiquer.html',              g:['La pratique','Practice'],       t:['Pratiquer','Practising']},
    {id:'enneagramme-essence.html',    g:['Les cartes','The maps'],        t:['L’ennéagramme de l’essence','The enneagram of essence']},
    {id:'le-chemin-de-lamour.html',    g:['L’amour','Love'],               t:['Le chemin de l’amour','The path of love']},
    {id:'glossaire.html',              g:['Repères','References'],         t:['Le glossaire','The glossary']},
    {id:'ouvrages.html',               g:['Repères','References'],         t:['La bibliothèque','The library']},
    {id:'lire-almaas.html',            g:['Repères','References'],         t:['Lire Almaas','Reading Almaas']}
  ];
  var L = isEN ? 1 : 0;
  var i = -1; for (var k=0;k<CH.length;k++){ if (CH[k].id===here){ i=k; break; } }

  if (here==='index.html' || here==='') return;   /* l'accueil garde sa couverture */
  var isChapter = i !== -1;
  var isPlan = here==='sommaire.html';
  var isAnnexe = !isChapter && !isPlan;   /* page reliée mais hors chaînage */
  var hasRail = isChapter || isAnnexe;    /* le rail s'affiche partout sauf sur le plan */

  var UI = isEN
    ? {home:'Home', som:'Contents', glo:'Glossary', prev:'Previous', next:'Next', end:'Reference', endt:'Contents'}
    : {home:'Accueil', som:'Sommaire', glo:'Glossaire', prev:'Précédent', next:'Suivant', end:'Repère', endt:'Le sommaire'};

  var DIAM = '<svg viewBox="0 0 120 120" aria-hidden="true">'
    +'<polygon points="60,14 96,44 60,106 24,44" fill="rgba(232,201,122,.14)"/>'
    +'<path d="M24 44 L60 14 L96 44 L60 106 Z" fill="none" stroke="#916a1b" stroke-width="3" stroke-linejoin="round"/>'
    +'<line x1="24" y1="44" x2="96" y2="44" stroke="#916a1b" stroke-width="2.2"/></svg>';

  /* ---- barre du haut ---- */
  var top = document.createElement('header');
  top.id = 'lv-top';
  var BRAND = isEN ? '<b>Essence <em>Regained</em></b>' : '<b>L’essence <em>retrouvée</em></b>';
  top.innerHTML =
    '<a class="lv-brand" href="index.html">'+DIAM+BRAND+'</a>'
    +'<nav>'
      +(hasRail?'<button class="lv-burger" type="button" aria-label="'+UI.som+'">☷</button>':'')
      +'<a href="index.html">'+UI.home+'</a>'
      +'<a href="sommaire.html" class="'+(isPlan?'on':'')+'">'+UI.som+'</a>'
      +'<a href="glossaire.html" class="'+(here==='glossaire.html'?'on':'')+'">'+UI.glo+'</a>'
    +'</nav>';

  var prog = document.createElement('div'); prog.id='lv-progress';

  /* ---- rail sommaire ---- */
  var rail = document.createElement('nav');
  rail.id='lv-rail'; rail.setAttribute('aria-label', UI.som);
  var html='', lastG='';
  CH.forEach(function(c){
    if (c.g[L]!==lastG){ html+='<div class="lab">'+c.g[L]+'</div>'; lastG=c.g[L]; }
    html+='<a href="'+c.id+'"'+(c.id===here?' class="on" aria-current="page"':'')+'>'+c.t[L]+'</a>';
  });
  rail.innerHTML=html;

  var back = document.createElement('div'); back.id='lv-backdrop';

  document.body.classList.add('livre');
  if (hasRail) document.body.classList.add('has-rail');

  function mount(){
    document.body.appendChild(prog);
    document.body.insertBefore(top, document.body.firstChild);
    if (hasRail){ document.body.appendChild(rail); document.body.appendChild(back); }

    /* pied précédent / suivant, seulement sur un chapitre */
    if (isChapter){
      var prev=CH[i-1], next=CH[i+1];
      var pager=document.createElement('nav'); pager.id='lv-pager'; pager.setAttribute('aria-label','Pagination');
      var h='';
      h+= prev ? '<a class="prev" href="'+prev.id+'"><span class="l">← '+UI.prev+'</span><span class="t">'+prev.t[L]+'</span></a>'
               : '<a class="prev empty" href="#"></a>';
      h+= next ? '<a class="next" href="'+next.id+'"><span class="l">'+UI.next+' →</span><span class="t">'+next.t[L]+'</span></a>'
               : '<a class="next" href="glossaire.html"><span class="l">'+UI.end+' →</span><span class="t">'+UI.endt+'</span></a>';
      pager.innerHTML=h;
      var host = document.querySelector('.voile.contenu') || document.querySelector('.contenu') || document.body;
      if (host===document.body) document.body.appendChild(pager);
      else host.appendChild(pager);
    }

    /* ouverture du rail en panneau (mobile) */
    var burger=top.querySelector('.lv-burger');
    if (burger){
      burger.addEventListener('click', function(){ document.body.classList.toggle('lv-open'); });
      back.addEventListener('click', function(){ document.body.classList.remove('lv-open'); });
      rail.addEventListener('click', function(e){ if (e.target.tagName==='A') document.body.classList.remove('lv-open'); });
      document.addEventListener('keydown', function(e){ if(e.key==='Escape') document.body.classList.remove('lv-open'); });
    }

    window.addEventListener('scroll', function(){
      var d=document.documentElement, sc=d.scrollTop||document.body.scrollTop;
      var hh=(d.scrollHeight-d.clientHeight)||1;
      prog.style.width=(sc/hh*100)+'%';
    });
  }
  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
