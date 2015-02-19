//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  var offset = getOffset($(window).width());

  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - offset
    }, 1500, 'easeInOutExpo');

    $('.crisis-page--navigation--trigger').prop('checked', false);
    event.preventDefault();
  });

  $(window).resize(function() {
    offset = getOffset($(window).width());
  });
});

function getOffset(width) {
  if (width >= 480) {
    return 68;
  } else {
    return 108;
  }
}