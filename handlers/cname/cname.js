function getCname(req, res, next) {
    var domain = req.params.domain;
    var query = req.queries(domain)

    var config = {
        host: process.env.DB_HOST,
        port: "1433",
        dialect: "mssql",
        userName: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    };

    var cnameResults = {
        landingPages: {
            cname: "",
            results: "placeholder"
        },
        cookieServer: {
            cname: "",
            results: ""
        },
        campaignLinks: {
            cname: "",
            results: ""
        },
        customerName: "",
        customerId: "",
        domainName: ""
    }

    init()

    async function init() {
        var connection = await new req.sql(config.database, config.userName, config.password, config);
        req.$scope.connection = connection;
        await getCnames();
        await setAttributes("landingPages", cnameResults.landingPages.cname)
        await setAttributes("cookieServer", cnameResults.cookieServer.cname)
        await setAttributes("campaignLinks", cnameResults.campaignLinks.cname)
        res.send(cnameResults)
    }

    async function getCnames() {
        var queryResults = await req.$scope.connection.query(query.cname)
        var results = queryResults[0][0]        
        if (queryResults[0] == 0) {
            res.send("Please enter a valid Salesfusion domain")
        } else {
            cnameResults.landingPages.cname = await results.hostedlink;
            cnameResults.cookieServer.cname = results.cookieserver;
            cnameResults.campaignLinks.cname = results.shareserver;
            cnameResults.customerName = results.customername;
            cnameResults.customerId = results.customer_id;
            cnameResults.domainName = results.domainname;
        }
    }

    async function setAttributes(key, domain) {
        try {
            var results = await req.dns.resolveCname(domain);
            cnameResults[key].results = results[0]
        } catch (error) {
          console.log(error)
            cnameResults[key].results = error.code;
        }
    }


}
module.exports = getCname;
