function getDkim(req, res, next) {
	var baseDomain = req.params.domain;
	var domain = "msgapp._domainkey." + req.params.domain;
	var domainShort = "_domainkey." + req.params.domain;

	var results = {
		dkimLong: "",
		dkimShort: "",
		messageLong: "",
		messageShort: "",
		dkimLongTF: "",
		dkimShortTF: "",
		allText: ""
	}
	
	async function resolveDkims() {
		await resolveDkimLong(domain);
		await resolveDkimShort(domainShort);
		await resolveTxt(baseDomain);
		await console.log(results);
		await res.send(results);
	}

	function resolveDkimLong(domain) {
		return req.dns.resolveTxt(domain)
			.then((response) => {
				if (response[0][0] == req.dkim.dkimLong) {
					results.dkimLong = response[0][0];
					results.messageLong = "It Matches!";
					results.dkimLongTF = true;
				} else {
					results.dkimLong = response[0][0];
					results.messageLong = "It doesn't match!";
					results.dkimLongTF = false;
				};
			})
			.catch((error) => {
				results.dkimLong = "";
				results.messageLong = "Error encountered loading DKIM (DKIM is either configured incorrectly or does not exist.)"
				results.dkimLongTF = false;
			})
	}

	function resolveTxt(domain) {
		return req.dns.resolveTxt(domain)
			.then((response) => {
				results.allText = response;
			})
			.catch((error) => {
				var errArray = []
				errArray.push(error.code)
				results.allText = errArray
			})
	}

	function resolveDkimShort(domain) {
		return req.dns.resolveTxt(domain)
			.then((response) => {
				if (response[0][0] == req.dkim.dkimShort || response[0][0] == req.dkim.dkimShort2) {
					results.dkimShort = response[0][0];
					results.messageShort = "It Matches!"
					results.dkimShortTF = true;
				} else {
					results.dkimShort = response[0][0];
					results.messageShort = "It doesn't match!";
					results.dkimShortTF = false;
				};
			})
			.catch((error) => {
				results.dkimShort = "";
				results.messageShort = "Error encountered loading DKIM (DKIM is either configured incorrectly or does not exist.)"
				results.dkimShortTF = false;
			})
	}

	resolveDkims();

}

module.exports = getDkim;
