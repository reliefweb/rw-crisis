var bunyan = require('bunyan');
var path = require('path');

var logFile = process.env.CRISIS_COLLECTOR_LOGS !== undefined
  ? path.join(process.env.CRISIS_COLLECTOR_LOGS, 'rw-crisis-collector.log')
  : 'rw-crisis-collector.log';

var log = bunyan.createLogger({
    name: require('../../package.json').name + '/collector',
    streams: [
      {
        level: 'info',
        stream: process.stdout
      },
      {
        level: 'info',
        path: logFile
      }
    ]
  });

module.exports = log;
