var skymap = require('../lib/skymap')({reliefweb: 'http://api.rwlabs.org'});

var config = require('../../config/config/river.json');

var data = {
  name: 'Test Config',
  content: config
};

skymap.process(data, function(err, result) {
  console.log(JSON.stringify(result, null, 4));
});
