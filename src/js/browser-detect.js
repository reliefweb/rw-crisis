var unsupported = false;

if (
  ($.browser.name == 'android') ||
  ($.browser.name == 'mozilla' && $.browser.versionNumber < 34) ||
  ($.browser.name == 'safari' && $.browser.versionNumber < 7) ||
  ($.browser.name == 'msie' && $.browser.versionNumber < 10) ||
  ($.browser.blackberry)
) {
  unsupported = true;
}

// Display the unsupported browser div.
if (unsupported === true) {
  $('.crisis-page--widget-container').hide();
  $('#menu-button').hide();
  $('.crisis-page--navigation--trigger').hide();
  $('.crisis-page--navigation').hide();
  $('.unsupported-browsers').removeClass('hidden');
  $('.rw--name-logo').css('background', 'url(../img/rw-logo.png) 50% 50% no-repeat');
}
