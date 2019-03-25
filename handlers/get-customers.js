function query(req, res, next) {

 var queries  = req.queries("placeholder");

 // server config
 var config = {
  host: "10.0.2.62",
  port: "1433",
  dialect: "mssql",
  userName: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "controller"
 };

 init()

 async function init(){
   try {
     var connection = await new req.sql(config.database, config.userName, config.password, config);
     req.$scope.connection = connection;
     var results = await getAllCustomers()
     res.send(results)
   } catch (error) {
     res.send(error);
   }
 }

 async function getAllCustomers(){
   return req.$scope.connection.query(queries.queryAllCustomers).spread(function(results) {
     return results;
   });
 }

}

module.exports = query;
