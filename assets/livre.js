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
    {id:'parcours-decouverte.html',    g:['L’ouverture','Opening'],        t:['Parcours découverte','Discovery path']},
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
    {id:'lire-almaas.html',            g:['Repères','References'],         t:['Lire Almaas','Reading Almaas']},
    {id:'ouvrages.html',               g:['Repères','References'],         t:['La bibliothèque','The library']},
    {id:'glossaire.html',              g:['Repères','References'],         t:['Le glossaire','The glossary']}
  ];
  var L = isEN ? 1 : 0;
  var i = -1; for (var k=0;k<CH.length;k++){ if (CH[k].id===here){ i=k; break; } }

  if (here==='index.html' || here==='') return;   /* l'accueil garde sa couverture */
  var isChapter = i !== -1;
  var isPlan = here==='sommaire.html';
  var isAnnexe = !isChapter && !isPlan;   /* page reliée mais hors chaînage */
  var hasRail = isChapter || isAnnexe;    /* le rail s'affiche partout sauf sur le plan */

  var UI = isEN
    ? {home:'Home', som:'Contents', glo:'Glossary', prev:'Previous', next:'Next', end:'Finish', endt:'Contents', why:'Why this step?'}
    : {home:'Accueil', som:'Sommaire', glo:'Glossaire', prev:'Précédent', next:'Suivant', end:'Fin', endt:'Le sommaire', why:'Pourquoi cette étape ?'};

  var TRANS = {
    'parcours-decouverte.html': [
      'On commence ici par le vécu, pas par une théorie. La page suivante donne ensuite les repères indispensables pour que les mots d’Almaas deviennent lisibles sans perdre leur profondeur.',
      'We begin here with lived experience, not with theory. The next page gives the essential landmarks so Almaas’s words become readable without losing their depth.'
    ],
    'douze-notions.html': [
      'La boussole est posée. On peut maintenant quitter la carte générale et entrer dans le premier geste concret de l’Approche Diamant : rester avec ce qui est là.',
      'The compass is now in place. We can leave the general map and enter the first concrete gesture of the Diamond Approach: staying with what is here.'
    ],
    'etre-ou-lon-est.html': [
      'Être présent révèle vite ce qui empêche la présence. Le premier obstacle rencontré n’est pas forcément une émotion : c’est souvent la voix intérieure qui juge, corrige et interdit.',
      'Presence quickly reveals what prevents presence. The first obstacle is not always an emotion: it is often the inner voice that judges, corrects, and forbids.'
    ],
    'le-juge-interieur.html': [
      'Quand le juge se relâche, on découvre souvent ce qu’il couvrait : un manque, une déficience, une zone vide qui demande à être comprise plutôt que remplie trop vite.',
      'When the judge loosens, we often discover what it was covering: lack, deficiency, an empty place asking to be understood rather than quickly filled.'
    ],
    'les-trous.html': [
      'Le manque devient alors une porte. Pour comprendre ce qu’il indique, il faut nommer ce qui manque réellement : non une idée spirituelle, mais l’essence comme présence vivante.',
      'Lack then becomes a doorway. To understand what it points to, we need to name what is truly missing: not a spiritual idea, but essence as living presence.'
    ],
    'lessence.html': [
      'Une fois l’essence reconnue comme réalité vécue, elle ne reste pas abstraite : elle se différencie en qualités précises, chacune avec sa fonction et sa manière de transformer l’âme.',
      'Once essence is recognized as lived reality, it does not remain abstract: it differentiates into precise qualities, each with its function and its way of transforming the soul.'
    ],
    'les-visages-de-lessence.html': [
      'Les qualités essentielles ne sont pas seulement des états. Elles mûrissent une personne capable de vivre depuis l’Être : c’est la question de la Perle.',
      'The essential qualities are not merely states. They mature a person capable of living from Being: this is the question of the Pearl.'
    ],
    'la-perle.html': [
      'La personne réelle ouvre ensuite une question plus intime encore : qui est ce “je” qui veut être vu, confirmé, aimé ? Le Point mène l’enquête jusqu’au noyau de l’identité.',
      'The real person then opens an even more intimate question: who is this “I” that wants to be seen, confirmed, loved? The Point takes inquiry to the core of identity.'
    ],
    'le-point.html': [
      'Quand l’identité se dépouille de ses images, le champ s’élargit. La lecture peut passer du noyau personnel aux dimensions sans forme de l’Être.',
      'When identity is stripped of its images, the field opens. The reading can move from the personal core to the formless dimensions of Being.'
    ],
    'l-immensite.html': [
      'Après l’immensité, il faut revenir au geste quotidien. La réalisation ne vaut pas seulement par ses sommets : elle se vérifie dans la manière d’enquêter, de sentir et de vivre.',
      'After immensity, we return to daily practice. Realization does not matter only through its summits: it is verified in the way we inquire, feel, and live.'
    ],
    'pratiquer.html': [
      'La pratique donne une méthode. L’ennéagramme montre ensuite comment cette méthode rencontre les structures typiques de perception, de défense et de retour à l’essence.',
      'Practice gives a method. The enneagram then shows how this method meets typical structures of perception, defense, and return to essence.'
    ],
    'enneagramme-essence.html': [
      'Après la carte des types, l’amour évite de réduire le travail à une architecture psychologique. Chez Almaas, l’amour devient présence, vérité et chemin vers le Bien-Aimé intérieur.',
      'After the map of types, love prevents the work from becoming merely psychological architecture. In Almaas, love becomes presence, truth, and a path toward the inner Beloved.'
    ],
    'le-chemin-de-lamour.html': [
      'Le parcours principal se clôt ici dans une qualité vivante. Les pages suivantes ne sont plus des “chapitres à avaler”, mais des repères pour continuer : quoi lire, où chercher, comment approfondir.',
      'The main path closes here in a living quality. The next pages are no longer chapters to consume, but references for continuing: what to read, where to search, how to deepen.'
    ],
    'lire-almaas.html': [
      'Après le chemin intérieur vient le choix des livres. La bibliothèque organise l’œuvre par besoins et par familles pour que l’approfondissement reste orienté.',
      'After the inner path comes the choice of books. The library organizes the work by needs and families so deeper study stays oriented.'
    ],
    'ouvrages.html': [
      'La bibliothèque indique les portes d’étude. Le glossaire devient ensuite l’outil chirurgical : revenir à un mot, vérifier une traduction, distinguer les notions proches.',
      'The library points to study doors. The glossary then becomes the surgical tool: return to a word, check a translation, distinguish neighboring notions.'
    ],
    'glossaire.html': [
      'Le parcours se termine par un outil ouvert. Pour reprendre autrement, retournez au sommaire : il permet de choisir entre lecture continue, étude par thème et recherche précise.',
      'The path ends with an open tool. To begin again differently, return to the contents: it lets you choose between continuous reading, thematic study, and precise search.'
    ]
  };

  var DIAM = '<svg viewBox="0 0 120 120" aria-hidden="true">'
    +'<polygon points="60,14 96,44 60,106 24,44" fill="rgba(232,201,122,.14)"/>'
    +'<path d="M24 44 L60 14 L96 44 L60 106 Z" fill="none" stroke="#916a1b" stroke-width="3" stroke-linejoin="round"/>'
    +'<line x1="24" y1="44" x2="96" y2="44" stroke="#916a1b" stroke-width="2.2"/></svg>';

  /* ---- barre du haut ---- */
  var top = document.createElement('header');
  top.id = 'lv-top';
  var BRAND = isEN ? '<b>Essence <em>Regained</em></b>' : '<b>L’essence <em>retrouvée</em></b>';
  var gloClass = 'lv-glo-link' + (here==='glossaire.html' ? ' on' : '');
  top.innerHTML =
    '<a class="lv-brand" href="index.html">'+DIAM+BRAND+'</a>'
    +'<nav>'
      +(hasRail?'<button class="lv-burger" type="button" aria-label="'+UI.som+'">☷</button>':'')
      +'<a href="index.html">'+UI.home+'</a>'
      +'<a href="sommaire.html" class="'+(isPlan?'on':'')+'">'+UI.som+'</a>'
      +'<a href="glossaire.html" class="'+gloClass+'">'+UI.glo+'</a>'
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

    function syncTopCompact(){
      var gl=top.querySelector('.lv-glo-link');
      if (gl) gl.style.display = (window.matchMedia && window.matchMedia('(max-width:640px)').matches) ? 'none' : '';
    }
    syncTopCompact();
    window.addEventListener('resize', syncTopCompact);

    /* pied précédent / suivant, seulement sur un chapitre */
    if (isChapter){
      var prev=CH[i-1], next=CH[i+1];
      var host = document.querySelector('.voile.contenu') || document.querySelector('.contenu') || document.querySelector('main.voile') || document.body;
      if (TRANS[here]){
        var transition=document.createElement('aside');
        transition.className='lv-transition';
        transition.innerHTML='<span class="lab">'+UI.why+'</span><p>'+TRANS[here][L]+'</p>';
        if (host===document.body) document.body.appendChild(transition);
        else host.appendChild(transition);
      }
      var pager=document.createElement('nav'); pager.id='lv-pager'; pager.setAttribute('aria-label','Pagination');
      var h='';
      h+= prev ? '<a class="prev" href="'+prev.id+'"><span class="l">← '+UI.prev+'</span><span class="t">'+prev.t[L]+'</span></a>'
               : '<a class="prev empty" href="#"></a>';
      h+= next ? '<a class="next" href="'+next.id+'"><span class="l">'+UI.next+' →</span><span class="t">'+next.t[L]+'</span></a>'
               : '<a class="next" href="sommaire.html"><span class="l">'+UI.end+' →</span><span class="t">'+UI.endt+'</span></a>';
      pager.innerHTML=h;
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
