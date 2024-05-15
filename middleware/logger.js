/*
const EventEmitter = require('events');
const uuid = require('uuid');

class Logger extends EventEmitter {
    log(msg) {
        this.emit('message', { id: uuid.v4(), msg });
    }
}

// module.exports = Logger;

const logger = new Logger();

logger.on('message', data => console.log('Called Listener:', data));

console.log("Hello World!");
*/
const moment = require('moment');

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} ${moment().format()}`);
    next();
}

module.exports = logger;