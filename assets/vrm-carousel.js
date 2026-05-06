/* Carousel enhancement: arrows + autoplay for .elementor-widget-image-carousel.
   Reads autoplay/speed from the widget's data-settings JSON. Falls back gracefully
   if JS doesn't load (CSS scroll-snap still allows manual swipe/scroll). */
(function () {
  'use strict';

  var SVG_PREV = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>';
  var SVG_NEXT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>';

  function parseSettings(el) {
    try { return JSON.parse(el.dataset.settings || '{}'); } catch (_) { return {}; }
  }

  function initCarousel(widget) {
    var wrapper = widget.querySelector('.elementor-image-carousel-wrapper');
    var track = widget.querySelector('.swiper-wrapper');
    if (!wrapper || !track) return;

    var slides = track.querySelectorAll('.swiper-slide');
    if (slides.length <= 1) return;

    var settings = parseSettings(widget);
    var autoplay = settings.autoplay !== 'no' && settings.autoplay !== false;
    var speed = parseInt(settings.autoplay_speed, 10) || 5000;
    var pauseOnHover = settings.pause_on_hover !== 'no' && settings.pause_on_hover !== false;
    var infinite = settings.infinite !== 'no' && settings.infinite !== false;

    // Inject arrows
    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'vrm-carousel-arrow vrm-carousel-arrow--prev';
    prev.setAttribute('aria-label', 'Imagen anterior');
    prev.innerHTML = SVG_PREV;

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'vrm-carousel-arrow vrm-carousel-arrow--next';
    next.setAttribute('aria-label', 'Imagen siguiente');
    next.innerHTML = SVG_NEXT;

    wrapper.appendChild(prev);
    wrapper.appendChild(next);

    function currentIndex() {
      var w = track.clientWidth;
      if (!w) return 0;
      return Math.round(track.scrollLeft / w);
    }

    function goTo(idx) {
      var n = slides.length;
      if (infinite) {
        idx = ((idx % n) + n) % n;
      } else {
        if (idx < 0) idx = 0;
        if (idx >= n) idx = n - 1;
      }
      track.scrollTo({ left: idx * track.clientWidth, behavior: 'smooth' });
    }

    function go(delta) { goTo(currentIndex() + delta); }

    var timer = null;
    function startTimer() {
      if (!autoplay || timer) return;
      timer = setInterval(function () { go(1); }, speed);
    }
    function stopTimer() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function resetTimer() { stopTimer(); startTimer(); }

    prev.addEventListener('click', function () { go(-1); resetTimer(); });
    next.addEventListener('click', function () { go(1); resetTimer(); });

    if (pauseOnHover) {
      wrapper.addEventListener('mouseenter', stopTimer);
      wrapper.addEventListener('mouseleave', startTimer);
    }
    // pause when tab is hidden, resume when visible
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopTimer(); else startTimer();
    });

    startTimer();
  }

  function init() {
    document.querySelectorAll('.elementor-widget-image-carousel').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
