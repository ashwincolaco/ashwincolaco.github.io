(function () {
  // Papers: id, short label, year, row, kind (lead | co), pre (preprint or submission)
  var rows = [
    { key: 'data', label: 'Data systems' },
    { key: 'ml', label: 'ML and LLM systems' },
    { key: 'net', label: 'Networks and security' }
  ];
  var years = [2020, 2022, 2023, 2026, 2027];
  var papers = [
    { id: 'genie',    text: 'ICDE',      year: 2026, row: 'data', lead: true },
    { id: 'octopus',  text: 'arXiv',     year: 2026, row: 'data', lead: false, pre: true },
    { id: 'farsight', text: 'submitted', year: 2026, row: 'data', lead: true,  pre: true },
    { id: 'salus',    text: 'SIGMOD',    year: 2027, row: 'data', lead: false },
    { id: 'lazystack',text: 'ICML',      year: 2026, row: 'ml',   lead: true },
    { id: 'nomad',    text: 'NeurIPS',   year: 2026, row: 'ml',   lead: true },
    { id: 'memory',   text: 'arXiv',     year: 2026, row: 'ml',   lead: true,  pre: true },
    { id: 'privacy',  text: 'arXiv',     year: 2026, row: 'ml',   lead: false, pre: true },
    { id: 'isgt',     text: 'ISGT',      year: 2020, row: 'net',  lead: true },
    { id: 'comsnets', text: 'COMSNETS',  year: 2022, row: 'net',  lead: false },
    { id: 'ncc',      text: 'NCC',       year: 2023, row: 'net',  lead: false }
  ];

  var grid = document.getElementById('mapgrid');
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }
  grid.appendChild(el('div', 'axis'));
  years.forEach(function (y) { grid.appendChild(el('div', 'axis', String(y))); });
  rows.forEach(function (r) {
    grid.appendChild(el('div', 'rowlabel', r.label));
    years.forEach(function (y) {
      var cell = el('div', 'cell');
      papers.filter(function (p) { return p.row === r.key && p.year === y; }).forEach(function (p) {
        var a = el('a', 'mark ' + (p.lead ? 'lead' : 'co') + (p.pre ? ' pre' : ''));
        a.href = '#p-' + p.id;
        a.dataset.id = p.id;
        a.appendChild(el('i'));
        a.appendChild(document.createTextNode(p.text));
        a.appendChild(el('span', 'yr', String(p.year)));
        cell.appendChild(a);
      });
      grid.appendChild(cell);
    });
  });

  // Link a map mark and its publication row so hovering either highlights both
  function setHot(id, on) {
    document.querySelectorAll('[data-id="' + id + '"]').forEach(function (n) { n.classList.toggle('hot', on); });
  }
  document.querySelectorAll('.mark, .pubs li').forEach(function (n) {
    var id = n.dataset.id;
    n.addEventListener('mouseenter', function () { setHot(id, true); });
    n.addEventListener('mouseleave', function () { setHot(id, false); });
  });
  document.querySelectorAll('.mark').forEach(function (n) {
    n.addEventListener('focus', function () { setHot(n.dataset.id, true); });
    n.addEventListener('blur', function () { setHot(n.dataset.id, false); });
  });

  // Highlight the section currently in view in the side index
  var links = {};
  document.querySelectorAll('.index a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && links[e.target.id]) {
          Object.keys(links).forEach(function (k) { links[k].classList.remove('on'); });
          links[e.target.id].classList.add('on');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
})();
