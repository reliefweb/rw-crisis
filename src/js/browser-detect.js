var unsupported = true;

if (
  ($.browser.name == 'chrome') ||
  ($.browser.name == 'mozilla' && $.browser.versionNumber >= 35) ||
  ($.browser.name == 'safari' && $.browser.versionNumber >= 8) ||
  ($.browser.name == 'msie' && $.browser.versionNumber >= 10)
) {
  unsupported = false;
}

// Display the unsupported browswer
if (unsupported === true) {
  $('.crisis-page--widget-container').hide();
  $('#menu-button').hide();
  $('.unsupported-browsers').removeClass('hidden');
}
