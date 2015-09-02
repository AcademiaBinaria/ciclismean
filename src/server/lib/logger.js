var winston = require('winston');
var MongoDB = require('winston-mongodb');
var settings = require("./settings.js");
var logger = null;
winston.emitErrs = true;
var console = new winston.transports.Console({
	level: 'debug',
	handleExceptions: true,
	json: false,
	colorize: true,
	timestamp: true
});
var mongoDb = {
	db: settings.mongoUrl,
	collection: 'logs',
	storeHost: true
};
/** configures the loggins system */
module.exports = config();


function config() {
	if (!logger) {
		logger = new winston.Logger({
			transports: [console],
			exitOnError: false
		});
	}
	if (settings.mongoUrl) {
		logger.add(winston.transports.MongoDB, mongoDb);
	}
	return logger;
};

/** json template for log entry objects */
module.exports.morgan_json = '{"url": ":url" , "sts": :status, "rtm": :response-time, "cnt": ":res[content-length]" , "ipa": ":remote-addr"}';
/** an input stream that receives events from morgan and sends them to winston  */
module.exports.morgan_stream = {
	write: function (message, encoding) {
		// removes the new line last char
		var morgan = message.slice(0, -1);
		try {
			// tries to get a JSON objet from the preformated string 
			var meta = JSON.parse(morgan);
			// parses the count of bytes if its present
			if (meta.cnt == "-") {
				meta.cnt = 0;
			} else {
				meta.cnt = parseInt(meta.cnt)
			}
			logger.info("express", meta);
		} catch (err) {
			logger.error("morgan_stream", err);
		}
	}
};
