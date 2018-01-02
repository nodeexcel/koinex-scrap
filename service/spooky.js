var phantomjs = require('phantomjs');

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}
module.exports = {
    scraping: function(URL, callback) {
        var spooky = new Spooky({
            child: {
                transport: 'http'
            },
            casper: {
                logLevel: 'debug',
                verbose: true,
            }
        }, function(err) {
            if (err) {
                e = new Error('Failed to initialize SpookyJS');
                e.details = err;
                throw e;
            }
            spooky.start('https://koinex.in/api/ticker');
            spooky.then(function() {
                this.emit('output', this.evaluate(function() {
                    return JSON.parse(document.body.textContent);
                }));
            });
            spooky.run();
        });
        spooky.on('error', function(e, stack) {
            if (stack) {}
        });
        spooky.on('console', function(line) {});

        spooky.on('output', function(body) {
            callback(body)
        });
        spooky.on('log', function(log) {
            if (log.space === 'remote') {
                console.log(log.message.replace(/ \- .*/, ''));
            }
        });
    }
}