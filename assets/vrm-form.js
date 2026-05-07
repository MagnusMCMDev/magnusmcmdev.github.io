/* Form submit -> WhatsApp.
   Reads visible fields (input/textarea/select) inside .elementor-form,
   builds a human-readable message, opens https://wa.me/<phone>?text=...
   Falls back to plain WhatsApp landing if JS doesn't run (form action). */
(function () {
  'use strict';

  var WHATSAPP_NUMBER = '34623941891'; // Spain country code + number, no + or spaces

  function getLabelFor(input) {
    if (input.id) {
      var l = document.querySelector('label[for="' + input.id + '"]');
      if (l) {
        var t = (l.textContent || '').trim();
        if (t) return t.replace(/\s*\*\s*$/, '').trim();
      }
    }
    if (input.placeholder) return input.placeholder;
    if (input.name) {
      // form_fields[message] -> message
      var m = input.name.match(/\[([^\]]+)\]/);
      if (m) return m[1];
      return input.name;
    }
    return '';
  }

  function buildMessage(form) {
    var lines = [];
    var inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(function (el) {
      var type = (el.type || '').toLowerCase();
      if (type === 'hidden' || type === 'submit' || type === 'button') return;
      if (type === 'checkbox' || type === 'radio') {
        if (!el.checked) return;
      }
      var value = (el.value || '').trim();
      if (!value) return;
      var label = getLabelFor(el) || 'Campo';
      // Skip the "accept privacy" checkbox label noise
      if (/pol.tica de privacidad/i.test(label) && (type === 'checkbox' || el.classList.contains('elementor-acceptance-field'))) {
        lines.push('Acepto política de privacidad: sí');
        return;
      }
      lines.push(label + ': ' + value);
    });
    return lines.join('\n');
  }

  document.addEventListener('submit', function (e) {
    var form = e.target.closest('.elementor-form');
    if (!form) return;
    e.preventDefault();
    var msg = buildMessage(form);
    var prefix = 'Hola Miguel, te contacto desde la web:\n\n';
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(prefix + msg);
    window.open(url, '_blank', 'noopener');
  });
})();
