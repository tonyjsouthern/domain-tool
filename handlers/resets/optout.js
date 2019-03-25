function optout (req, res, next) {
  var email = req.body.email;
  var server = req.body.server;
  var database = req.body.database;
  var queries	= req.queries(email);

    var config = {
     host: server,
     port: "1433",
     dialect: "mssql",
     userName: process.env.DB_USERNAME,
     password: process.env.DB_PASSWORD,
     database: database
    };

    async function runQuery () {
      var connection 	= await new req.sql(config.database, config.userName, config.password, config);
      req.$scope.connection = connection;
      var result = await req.$scope.connection.query(queries.updateOptOut)
      res.send("Success!");
    }

    runQuery();
    
}

module.exports = optout;
