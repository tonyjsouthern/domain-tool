function checkTracking(req, res, next) {
    var domain = req.body.domain;
    var html;

    var domainObject = {
        Salesfusion: false,
        Hubspot: false,
        Marketo: false,
        ActOn: false,
        ClickDimensions: false,
        Pardot: false,
        Google: false,
        gtm: false
    };

    init();

    async function init() {
      try {
        html = await req.axios.get(domain)
        runChecks(html.data);
        await checkForTagManager(html.data);
        res.send(domainObject)  
      } catch (error) {
        return
      }
    }

    async function checkForTagManager(html) {
        try {
            if (domainObject.gtm == true) {
                var gtmID = await parseGTM(html)
                var gtmScripts = await req.axios.get('https://www.googletagmanager.com/gtm.js?id=GTM-' + gtmID)
                runChecks(gtmScripts.data);
            } else {
                console.log("Injectors false")
            }
        } catch (error) {
            return
        }
    }

    function parseGTM(html) {
        var $ = req.cheerio.load(html);
        var gtmText = $('noscript').text();
        var splitGtmText = gtmText.split("GTM-")
        var seventhChar = splitGtmText[1].substr(6, 1)
        if (seventhChar == '"') {
            return splitGtmText[1].slice(0, 6);
        } else {
            return splitGtmText[1].slice(0, 7);
        }
    }

    function runChecks(code) {
        checkSF(code);
        genericCheck(code, "Hubspot", "hs-script", )
        genericCheck(code, "Marketo", "munchkin");
        genericCheck(code, "ActOn", "/acton/bn/tracker/");
        genericCheck(code, "ClickDimensions", "analytics.clickdimensions.com");
        genericCheck(code, "Pardot", "pd.js");
        genericCheck(code, "Google", "GoogleAnalytics");
        genericCheck(code, "gtm", "googletagmanager")
    }

    function genericCheck(code, key, index) {
        if (code.indexOf(index) != -1) {
            domainObject[key] = true;
        }
    }

    function checkSF(code) {
        if (code.indexOf("sf_config") != -1 || code.indexOf("frt(") != -1) {
            domainObject.Salesfusion = true;
        }
    }

}

module.exports = checkTracking;
