var path = require('path');
var opts = require('nomnom')
  .script('collector')
  .help('Processes configuration files looking for properties specified as API requests and rewrites them with API-provided data.')
  .option('version', {
    flag: true,
    help: 'Print version and exit.',
    callback: function() {
      return require('../package.json').version;
    }
  })
  .option('dev', {
    flag: true,
    help: 'In dev mode the configuration is pulled and written to src/ instead of dev/.'
  })
  .option('widget-config-path', {
    help: 'Specify the directory path within the docroot where widget config should be saved. [Variation Untested].',
    default: 'config'
  })
  .parse();

var fs = require('fs');
var io = require('./io')();

if (opts.dev) {
  opts.src = path.normalize(__dirname + '../../../config');
  opts.dest = path.normalize(__dirname + '../../../src');
}
else {
  opts.src = path.normalize(__dirname + '../../../config');
  opts.dest = path.normalize(__dirname + '../../../dist');
}

opts.config = path.join(opts.src, 'config.json');
if (!io.fileExists(opts.config)) {
  return 1;
}

var config = io.readJSON(opts.config);
var collect = require('./collect')(config, opts);
collect.verifyDownloadedConfig();
collect.saveRemoteConfig();
collect.updatePrimaryConfig();

