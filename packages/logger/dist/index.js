"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const tslog_1 = require("tslog");
/**
 * Crée un logger tslog préconfiguré pour un service donné.
 * Format JSON en production, pretty-print coloré en développement.
 *
 * @example
 * export const logger = createLogger('Renenutet');
 */
function createLogger(name, nodeEnv = process.env.NODE_ENV) {
    return new tslog_1.Logger({
        name,
        type: nodeEnv === 'production' ? 'json' : 'pretty',
        minLevel: nodeEnv === 'production' ? 3 : 0,
        prettyLogTemplate: '{{yyyy}}-{{mm}}-{{dd}} {{hh}}:{{MM}}:{{ss}} {{logLevelName}}\t[{{name}}] ',
        prettyErrorTemplate: '\n{{errorName}} {{errorMessage}}\n{{errorStack}}',
        prettyErrorStackTemplate: '  • {{fileName}}\t{{method}}\n\t{{filePathWithLine}}',
        stylePrettyLogs: true,
    });
}
