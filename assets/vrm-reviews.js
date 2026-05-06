/* Toggle the truncated review text in-place when "More" is clicked. */
(function () {
  document.addEventListener('click', function (e) {
    var more = e.target.closest('.google-business-reviews-rating .review-more-placeholder');
    if (!more) return;
    var excerpt = more.closest('.text-excerpt');
    if (excerpt) excerpt.classList.toggle('is-expanded');
  });
})();
