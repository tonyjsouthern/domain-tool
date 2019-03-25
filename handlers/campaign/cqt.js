function cqt (req, res, next) {
  var email 		= req.body.email;
  var server 	= req.body.server;
  var database = req.body.database;
  var queries 	= req.queries(email);

  var config = {
   host: server,
   port: "1433",
   dialect: "mssql",
   userName: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: database
  };

  var results = {
    campaignerActualCount: ''    
  }

  connectSendResults();

  async function connectSendResults () {
    try {
      var connection = await new req.sql(config.database, config.userName, config.password, config);
      req.$scope.connection = connection;
      await getContactData();
    } catch (error) {
      res.send(error)
    }
  }

  function getContactData() {
    return req.$scope.connection.query(queries.cqt).spread(function(results) {
      if (results.length == 0){
        res.send("This record does not exist within the customer's database.")
      }else{
        res.send(results)
      }
    });
  }

}

module.exports = cqt;
