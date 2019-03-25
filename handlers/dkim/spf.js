function getSpf(req, res, next) {
	var domain = req.params.domain;
	var vRecord = [];

	req.dns.resolveTxt(domain)
		.then((response) => {
			for (var i = 0; i < response.length; i++) {
				if (response[i][0].indexOf("v=spf1") != -1) {
					if (response[i][0].indexOf("auth.msgapp.com") != -1) {
						vRecord.push({
							results: response[i][0],
							message: "It Matches!",
							value: true
						});
					} else {
						vRecord.push({
							results: response[i][0],
							message: "It Doesn't Match!",
							value: false
						});
					}
				}
			}
			res.send(vRecord);
		})
		.catch((error) => {
			console.log(error);
			vRecord.push({
				results: "",
				message: "Error encountered loading spf"
			});
			res.send(vRecord)
		})

}

module.exports = getSpf;
