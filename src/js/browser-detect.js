var unsupported = false;

if (
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
  $('.unsupported-browsers').removeClass('hidden');
}
