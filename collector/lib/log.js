var bunyan = require('bunyan'),
  log = bunyan.createLogger({
    name: require('../../package.json').name + '/collector',
    streams: [
      {
        level: 'info',
        stream: process.stdout
      },
      {
        level: 'info',
        path: '/var/log/rw-crisis-collector.log'
      }
    ]
  });

module.exports = log;