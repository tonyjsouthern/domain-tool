function drt(req, res, next) {
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

 class ResultSet {
  constructor(guardedWatch, emailValidation, optOut, systemSoftBounce, emailDeliveryStatus, supressionList, deleted, delstatus) {
   this.guardedWatch 				= guardedWatch;
   this.emailValidation 		= emailValidation;
   this.optOut 							= optOut;
   this.systemSoftBounce 		= systemSoftBounce;
   this.emailDeliveryStatus = emailDeliveryStatus;
   this.supressionList 			= supressionList;
   this.deleted 						= deleted;
   this.delStatus           = delstatus
  }
}

 async function runAll() {
  var connection 				= await new req.sql(config.database, config.userName, config.password, config);
  req.$scope.connection = connection;
  var existsCheck 			= await checkRecordExists();
  var deleted 					= await queryDeleted();
  var guardedWatch 			= await queryGuardedWatch();
  var emailValidation 	= await queryEmailValidation();
  var optOut 						= await queryOptOut();
  var softBounce 				= await querySoftBounce();
  var hardbounce 				= await queryHardBounce();
  var supressionList 		= await querySupressionList();
  var delstatus         = await queryDelstatus();
  var results 					= new ResultSet(guardedWatch, emailValidation, optOut, softBounce, hardbounce, supressionList, deleted, delstatus);
  req.$scope.connection.close();
  res.send(results);
}

 function checkRecordExists() {
  return req.$scope.connection.query(queries.optOut).spread(function(results) {
   if (results.length == 0) {
    res.send("This record does not exist within the customers database.");
   }
  });
 }

 function queryDelstatus() {
 	var message;
 	return req.$scope.connection.query(queries.delstatus).spread(function (results) {
 		if (results.length >= 2) {
 			results.forEach((contact) => {
 				if (contact.delstatus == 2) {
 					return message = {
 						message: "This record has a delstatus of 2 (Invalid)",
 						value: true
 					}
 				} else {
   				return message = {
   					message: "This record has a delstatus of " + results[0].delstatus + ".",
   					value: false
   				}
        }
 			})
 		} else if (results.length == 1) {
 			if (results[0].delstatus == 2) {
 				return message = {
 					message: "This record has a delstatus of 2 (Invalid)",
 					value: true
 				}
 			} else {
 				return message = {
 					message: "This record has a delstatus of " + results[0].delstatus + ".",
 					value: false
 				}
 			}
 		}
    return message;
 	})
 }

 function queryDeleted() {
  return req.$scope.connection.query(queries.deleted).spread(function(results) {
   if (results.length == 0) {
    return {
     message: "This record is not deleted and does not have any deleted duplicates.",
     value: false
	 };
   } else if (results.length >= 1) {
    var message;
    results.forEach((contact) => {
     if (contact.deleteddate != null)
      message = {
       message: 'This record has ' + results.length + " deleted record(s).",
       value: true
		 };
    })
    return message;
   }
  });
 }

 function queryGuardedWatch() {
  return req.$scope.connection.query(queries.guardedWatch).spread(function(results) {
   if (results.length == 0) {
    return {
     message: "This record is not present on the Guarded Watch.",
     value: false
	  };
   } else {
    return {
     message: 'The record unsubscribed from campaign ID ' + results[0].campaignid + " on " + results[0].createddate + ".",
     value: true
	  };
   }
  });
 }

 function queryEmailValidation() {
  return req.$scope.connection.query(queries.emailValidation).spread(function(results) {
   if (results.length == 0) {
    return {
     message: 'This record is not present on the Email Validation table',
     value: false
  	 };
   } else {
    return {
     message: 'This record is active on the Email Validation table as of ' + results[0].createddate + ".",
     value: true
	  };
   }
  });
 }

 function queryOptOut() {
  return req.$scope.connection.query(queries.optOut).spread(function(results) {
   if (results.length >= 2) {
    var message;
    results.forEach((contact) => {
     if (contact.opout == 'Y') {
      message = {
       message: results.length + " contacts found with mixed opOut status",
       value: true
	  	 };
     }else{
       message =  {
        message: "This record is not opted out.",
        value: false
      };
     }
    })
    return message;
   } else if (results[0].opout == 'N') {
    return {
     message: "This record is not opted out.",
     value: false
	  };
   } else {
    return {
     message: "This record was opted out on " + results[0].opoutdate + ".",
     value: true
	  };
   }
  });
 }

 function querySupressionList() {
  return req.$scope.connection.query(queries.supressionList).spread(function(results) {
   if (results.length == 0) {
    return {
     message: "This record is not present on any supression lists.",
     value: false
	  };
   } else {
    return {
     message: 'This record has ' + results.length + " record on list id " + results[0].listid + ".",
     value: true
	  };
   }
  });
 }

 function querySoftBounce() {
  return req.$scope.connection.query(queries.systemSoftBounce).spread(function(results) {
   if (results.length == 0) {
    return {
     message: "This record has no soft bounces.",
     value: false
	  };
   } else {
    return {
     message: 'This record has ' + results.length + " entries on the System Soft Bounce Tables.",
     value: true
	  };
   }
  });
 }

 function queryHardBounce() {
  return req.$scope.connection.query(queries.emailDeliveryStatus).spread(function(results) {
   if (results.length == 0) {
    return {
     message: "This record has no hard bounces.",
     value: false
	  };
   } else {
    return {
     message: 'This record has ' + results.length + " entries on the Hard Bounce table.",
     value: true
	  };
   }
  });
 }

 runAll();

}

module.exports = drt;
