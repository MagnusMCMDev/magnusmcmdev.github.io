(function () {
  'use strict';

  function lockScroll() {
    if (document.body.classList.contains('vrm-dialog-open')) return;
    var y = window.scrollY || window.pageYOffset || 0;
    document.body.dataset.vrmScrollY = String(y);
    document.body.style.top = '-' + y + 'px';
    document.body.classList.add('vrm-dialog-open');
  }

  function unlockScroll() {
    if (!document.body.classList.contains('vrm-dialog-open')) return;
    var y = parseInt(document.body.dataset.vrmScrollY || '0', 10);
    document.body.classList.remove('vrm-dialog-open');
    document.body.style.top = '';
    delete document.body.dataset.vrmScrollY;
    window.scrollTo({ top: y, left: 0, behavior: 'instant' });
  }

  function openDialog(dialog) {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    lockScroll();
    dialog.showModal();
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    dialog.close();
  }

  function init() {
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-open]');
      if (trigger) {
        var id = trigger.getAttribute('data-open');
        var dialog = document.getElementById(id);
        if (dialog) {
          e.preventDefault();
          e.stopPropagation();
          openDialog(dialog);
          return;
        }
      }
      var closeBtn = e.target.closest('[data-close-dialog]');
      if (closeBtn) {
        var d = closeBtn.closest('dialog.vrm-dialog');
        if (d) closeDialog(d);
      }
    }, true);

    document.querySelectorAll('dialog.vrm-dialog').forEach(function (dialog) {
      dialog.addEventListener('click', function (e) {
        if (e.target !== dialog) return;
        var rect = dialog.getBoundingClientRect();
        var inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (!inside) closeDialog(dialog);
      });
      dialog.addEventListener('close', function () {
        unlockScroll();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
