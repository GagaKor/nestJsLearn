"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const env = process.env.NODE_ENV;
const logDir = __dirname + '/../../logs';
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
};
winston.addColors(colors);
exports.winstonLogger = nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            level: env ? 'silly' : 'http',
            format: env === 'production'
                ?
                    winston.format.combine(winston.format.colorize({ all: false }), winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('Prod', {
                        prettyPrint: true,
                    }))
                : winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp(), nest_winston_1.utilities.format.nestLike('Dev', {
                    prettyPrint: true,
                })),
        }),
    ],
});
//# sourceMappingURL=logger.config.js.map