/* The Wildwood Method.

   The eight decisions ship in the page as an ordered list, so the content is
   present for search engines and readable if this file never runs. What happens
   here is enhancement only: the list becomes a row of numbered buttons and one
   panel, and the list itself is removed from the flow.

   Built as a tablist rather than an accordion because the eight decisions are
   one sequence viewed a step at a time, not eight independent disclosures. */
(function () {
  var list = document.querySelector('[data-method]');
  if (!list) return;

  var items = [].slice.call(list.querySelectorAll('.method__item')).map(function (li) {
    var h = li.querySelector('h3'), p = li.querySelector('p');
    return { head: h ? h.textContent : '', sub: p ? p.textContent : '' };
  });
  if (items.length < 2) return;

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  var tabs = document.createElement('div');
  tabs.className = 'method__tabs';
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'The eight decisions');

  var panel = document.createElement('div');
  panel.className = 'method__panel';
  panel.id = 'method-panel';
  panel.setAttribute('role', 'tabpanel');
  panel.setAttribute('tabindex', '0');

  var buttons = items.map(function (item, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'method__tab';
    b.id = 'method-tab-' + (i + 1);
    b.textContent = pad(i + 1);
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-controls', 'method-panel');
    tabs.appendChild(b);
    return b;
  });

  var current = -1;
  function show(i, focus) {
    if (i === current) return;
    current = i;
    buttons.forEach(function (b, j) {
      var on = j === i;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.setAttribute('tabindex', on ? '0' : '-1');
      b.classList.toggle('is-active', on);
    });
    panel.setAttribute('aria-labelledby', buttons[i].id);
    panel.innerHTML = '';
    var n = document.createElement('p');
    n.className = 'method__num';
    n.textContent = 'Decision ' + pad(i + 1);
    var h = document.createElement('h3');
    h.className = 'method__head';
    h.textContent = items[i].head;
    var s = document.createElement('p');
    s.className = 'method__sub';
    s.textContent = items[i].sub;
    panel.appendChild(n); panel.appendChild(h); panel.appendChild(s);
    if (focus) buttons[i].focus();
  }

  tabs.addEventListener('click', function (e) {
    var i = buttons.indexOf(e.target);
    if (i > -1) show(i);
  });

  // Left/right walk the sequence, home/end jump to either end.
  tabs.addEventListener('keydown', function (e) {
    var i = buttons.indexOf(document.activeElement);
    if (i < 0) return;
    var next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % buttons.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + buttons.length) % buttons.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = buttons.length - 1;
    if (next === null) return;
    e.preventDefault();
    show(next, true);
  });

  list.parentNode.insertBefore(tabs, list);
  list.parentNode.insertBefore(panel, list);
  list.remove();
  show(0);
})();
