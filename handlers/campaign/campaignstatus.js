function campaignStatus (req, res, next){
  var campaign_id 		= req.body.campaign_id;
  var domain          = req.body.domain;
  var server 	        = req.body.server;
  var database        = req.body.database;
  var queries 	      = req.queries(campaign_id);

  var config = {
   host: server,
   port: "1433",
   dialect: "mssql",
   userName: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: database
  };

  let results = {
    campaignerOverview: '',
    campaignerActualCount: '',
    campaignerStagingCount: '',
    campaignerLists: '',
    message: ''
  }

  init();

  async function init(){
    try {
      var connection = await new req.sql(config.database, config.userName, config.password, config);
      req.$scope.connection = connection;
      results.campaignerOverview = await runQuery(queries.campaignerOverview);
      checkCampaignStatus();
      results.campaignerActualCount = await runQuery(queries.campaignerActualCount);
      results.campaignerStagingCount = await runQuery(queries.campaignerStagingCount);
      results.campaignerLists = await runQuery(queries.campaignerLists);
      res.send(results);
    } catch (error) {
    res.send(error);
    }
  }

  async function runQuery(query) {
    return req.$scope.connection.query(query).spread(function(results) {
      return results;
    });
  }

  async function checkCampaignStatus(){
    if (results.campaignerOverview[0].status == 9){
      results.message = "This Campaign is in Draft Mode."
    }
  }

}

module.exports = campaignStatus;
