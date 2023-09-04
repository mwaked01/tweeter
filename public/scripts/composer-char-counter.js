$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const $counter = $(this).closest('form').find('.counter');
    const chrasLeft = 140 - this.value.length;

    if (chrasLeft < 0) {
      $counter.addClass('negative');
    } else {
      $counter.removeClass('negative');
    }
    
    $counter.text(chrasLeft);
  });
});