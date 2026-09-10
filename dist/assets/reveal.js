/* Scroll reveals.
   Blocks fade and rise as they enter the viewport, staggered within a group.

   The hidden state is applied here rather than in the markup, so if this file
   never runs the page simply renders static and fully visible.

   A rAF-throttled sweep is used rather than IntersectionObserver: an instant
   jump in scroll position (an anchor link, a restored position, a fast flick)
   moves an element from below the viewport to above it without ever crossing an
   intersection threshold, so an observer would never fire and the element would
   stay hidden permanently. The sweep reveals anything at or above the fold,
   whether it was scrolled through or skipped over. */
(function () {
  "use strict";

  var SELECTORS = [
    ".hero-inner .eyebrow", ".hero-inner h1", ".hero-inner > p", ".hero-inner .actions",
    ".strip p",
    ".page-head .eyebrow", ".page-head h1", ".page-head .lede",
    ".section > .wrap > .eyebrow", ".section .wrap > h2", ".section .wrap > .lede",
    ".section > .wrap > p", ".section > .wrap > img", ".section > .narrow > *",
    ".checklist li", ".media figure", ".card", ".faq details",
    ".prose > h2", ".prose > h3", ".prose > p", ".prose > ul", ".prose > .actions",
    ".feature-img"
  ];

  var found = [];
  SELECTORS.forEach(function (sel) {
    var nodes;
    try { nodes = document.querySelectorAll(sel); } catch (e) { return; }
    Array.prototype.forEach.call(nodes, function (el) {
      if (found.indexOf(el) === -1) found.push(el);
    });
  });

  // Drop anything nested inside another target, so a block never animates twice.
  var pending = found.filter(function (el) {
    return !found.some(function (other) { return other !== el && other.contains(el); });
  });
  if (!pending.length) return;

  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return;  // leave everything visible and unanimated

  // Stagger siblings that share a parent, so grids arrive in sequence.
  var groups = [];
  var counts = [];
  pending.forEach(function (el) {
    var idx = groups.indexOf(el.parentNode);
    if (idx === -1) { groups.push(el.parentNode); counts.push(0); idx = groups.length - 1; }
    var position = Math.min(counts[idx], 5);
    counts[idx] += 1;
    if (position > 0) el.style.transitionDelay = (position * 0.09).toFixed(2) + "s";
    el.classList.add("reveal");
  });

  var throttleTimer = null;
  var lastRun = 0;

  function sweep() {
    var fold = (window.innerHeight || document.documentElement.clientHeight) * 0.92;
    var remaining = [];
    for (var i = 0; i < pending.length; i++) {
      var el = pending[i];
      // Reveal once the element has reached the fold, including anything the
      // viewport has already moved past.
      if (el.getBoundingClientRect().top < fold) {
        el.classList.add("is-visible");
      } else {
        remaining.push(el);
      }
    }
    pending = remaining;
    if (!pending.length) {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
    }
  }

  // Time-based throttle rather than requestAnimationFrame: rAF is paused in
  // background or non-painting tabs, which would leave blocks hidden.
  function request() {
    var now = Date.now();
    if (now - lastRun > 100) {
      lastRun = now;
      sweep();
      return;
    }
    clearTimeout(throttleTimer);
    throttleTimer = setTimeout(function () {
      lastRun = Date.now();
      sweep();
    }, 100);
  }

  // First pass runs synchronously so above-the-fold content is already marked
  // visible before the first paint, with no flash of hidden content.
  sweep();

  if (pending.length) {
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    window.addEventListener("load", request);
    // Webfonts change line heights and therefore element positions, so sweep
    // again once they have settled.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(sweep).catch(function () {});
    }
    setTimeout(sweep, 400);
    setTimeout(sweep, 1500);
  }
})();
