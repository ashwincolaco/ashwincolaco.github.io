(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var banner = document.querySelector('.banner');
  if (reduce && banner && banner.pauseAnimations) banner.pauseAnimations();
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (n) { n.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  items.forEach(function (n) { io.observe(n); });
  // an anchor link to a paper should never land on a hidden entry
  if (location.hash) { var t = document.querySelector(location.hash); if (t) t.classList.add('in'); }
})();
