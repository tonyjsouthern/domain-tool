module.exports = {
	getCustomers: require("./handlers/get-customers.js"),
	getDkim: require("./handlers/dkim/dkim.js"),
	getSpf: require("./handlers/dkim/spf.js"),
	getCname: require("./handlers/cname/cname.js"),
	getCnameSingular: require("./handlers/cname/cnamesingular.js"),
	checkTracking: require("./handlers/checkTracking.js"),
	whois: require("./handlers/whois.js"),
	drt: require("./handlers/drt.js"),
	cqt: require("./handlers/campaign/cqt.js"),
	campaignStatus: require("./handlers/campaign/campaignstatus.js"),
	campaignCount: require("./handlers/campaign/campaigncount.js"),

	guardedWatch: require('./handlers/resets/guardedWatch.js'),
	deleted: require('./handlers/resets/deleted.js'),
	validation: require('./handlers/resets/validation.js'),
	supression: require('./handlers/resets/supression.js'),
	optout: require('./handlers/resets/optout.js'),
	softBounce: require('./handlers/resets/softBounce.js'),
	hardBounce: require('./handlers/resets/hardBounce.js'),
	delstatus: require('./handlers/resets/delstatus.js')
};
