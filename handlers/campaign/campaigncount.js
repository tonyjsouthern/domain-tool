function campaignCount(req, res, next) {
  var campaign_id = req.body.campaign_id;
  var domain =  req.body.domain;
  var url = 'https://mercury.salesfusion360.com/api/campaigns/email/' + campaign_id + '/lists/count'

  var apiConfig = {
    username: process.env.SF_USERNAME,
    password: process.env.SF_PASSWORD
  }

  getCampaignCount();

  function getCampaignCount(){
    return req.axios.get(url, {auth: {
        username: apiConfig.username + '@' + domain,
        password: apiConfig.password
      }
    })
    .then((response) => {
      console.log(response.data)
      res.send(response.data)
    })
  }


}

module.exports = campaignCount;
