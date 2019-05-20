define('src/services/service.js',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var BackendService = exports.BackendService = function () {
        function BackendService() {
            _classCallCheck(this, BackendService);
        }

        BackendService.prototype.cqt = function cqt(email, server, database) {
            return axios.post('/cqt', {
                email: email,
                server: server,
                database: database
            });
        };

        BackendService.prototype.csc = function csc(campaign_id, server, database) {
            return axios.post('/campaignstatus', {
                campaign_id: campaign_id,
                server: server,
                database: database
            });
        };

        BackendService.prototype.campaignCount = function campaignCount(campaign_id, domain) {
            return axios.post('/campaigncount', {
                campaign_id: campaign_id,
                domain: domain
            });
        };

        BackendService.prototype.getCustomers = function getCustomers(query, server, database) {
            return axios.get('/get-customers');
        };

        return BackendService;
    }();
});
define('src/services/reset-service.js',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ResetService = exports.ResetService = function () {
    function ResetService() {
      _classCallCheck(this, ResetService);
    }

    ResetService.prototype.drt = function drt(email, server, database) {
      return axios.post('/drt', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.guardedWatch = function guardedWatch(email, server, database) {
      return axios.post('/guardedWatch', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.updateDeleted = function updateDeleted(email, server, database) {
      return axios.post('/deleted', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.emailValidation = function emailValidation(email, server, database) {
      return axios.post('/validation', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.updateSupression = function updateSupression(email, server, database) {
      return axios.post('/supression', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.updateOptout = function updateOptout(email, server, database) {
      return axios.post('/optout', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.updateSoftBounce = function updateSoftBounce(email, server, database) {
      return axios.post('/softBounce', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.updateHardBounce = function updateHardBounce(email, server, database) {
      return axios.post('/hardBounce', {
        email: email,
        server: server,
        database: database
      });
    };

    ResetService.prototype.updateDelstatus = function updateDelstatus(email, server, database) {
      return axios.post('/delstatus', {
        email: email,
        server: server,
        database: database
      });
    };

    return ResetService;
  }();
});
define('src/services/dns-service.js',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DnsService = exports.DnsService = function () {
        function DnsService() {
            _classCallCheck(this, DnsService);
        }

        DnsService.prototype.checkDomainTracking = function checkDomainTracking(domain) {
            return axios.post('/tracking', {
                domain: domain
            });
        };

        DnsService.prototype.checkDomainDkim = function checkDomainDkim(domain) {
            return axios.get('/dkim/' + domain);
        };

        DnsService.prototype.checkDomainSpf = function checkDomainSpf(domain) {
            return axios.get('/spf/' + domain);
        };

        DnsService.prototype.checkCname = function checkCname(domain) {
            return axios.get('/cname/' + domain);
        };

        DnsService.prototype.checkCnameSingular = function checkCnameSingular(domain) {
            return axios.get('/cnamesingular/' + domain);
        };

        DnsService.prototype.checkWhois = function checkWhois(domain) {
            return axios.get('/whois/' + domain);
        };

        return DnsService;
    }();
});
define('src/services/connect-string-converter.js',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ConnectStringConverter = exports.ConnectStringConverter = function () {
		function ConnectStringConverter() {
			_classCallCheck(this, ConnectStringConverter);

			this.connectObject = {
				server: "",
				database: ""
			};

			this.utmConnectObject = {
				customerName: "",
				server: "",
				database: "",
				domainName: ""
			};
		}

		ConnectStringConverter.prototype.convertSqlString = function convertSqlString(string) {
			var splitString = string.split(";");
			this.connectObject.server = splitString[0].substr(7);
			this.connectObject.database = splitString[3].substr(9);
			return this.connectObject;
		};

		ConnectStringConverter.prototype.convertUtmString = function convertUtmString(string) {
			var splitString = string.split("$");
			this.utmConnectObject.server = splitString[0];
			this.utmConnectObject.database = splitString[1];
			this.utmConnectObject.customerName = splitString[2];
			this.utmConnectObject.domainName = splitString[3];
			return this.utmConnectObject;
		};

		return ConnectStringConverter;
	}();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    return aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('dns/whois',['exports', 'aurelia-framework', '../src/services/dns-service.js'], function (exports, _aureliaFramework, _dnsService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.WhoIs = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var WhoIs = exports.WhoIs = (_dec = (0, _aureliaFramework.inject)(_dnsService.DnsService), _dec(_class = function () {
        function WhoIs(DnsService) {
            _classCallCheck(this, WhoIs);

            this.DnsService = DnsService;

            this.domain;
            this.whoIsResults;

            this.showResults = false;
            this.showDomainInfo = true;
            this.showMxInfo = true;
            this.showRegisterInfo = false;
            this.showNameServerInfo = false;
        }

        WhoIs.prototype.runWhoIs = function runWhoIs() {
            var _this = this;

            this.showResults = false;
            var element = document.getElementsByClassName("submit-button");
            element[0].classList.add("is-loading");
            this.DnsService.checkWhois(this.domain).then(function (response) {
                _this.whoIsResults = response.data;
                _this.showResults = true;
                element[0].classList.remove("is-loading");
            });
        };

        WhoIs.prototype.genericToggle = function genericToggle(attribute) {
            if (this[attribute] == false) {
                this[attribute] = true;
            } else {
                this[attribute] = false;
            }
        };

        return WhoIs;
    }()) || _class);
});
define('text!dns/whois.html', ['module'], function(module) { module.exports = "<template>\r\n   <div class=\"cont margin-top-extra animated fadeIn faster\">\r\n\r\n  <div class=\"box\">\r\n   <p class=\"title is-6 is-centered\">Who Is</p>\r\n   </div>\r\n\r\n   <div class=\"box\">\r\n   <form>\r\n      <div class=\"dkim-cont is-centered\">\r\n         <p class=\"title is-6 \">Enter Your domain name:</p>\r\n         <input class=\"input\" value.bind=\"domain\" placeholder=\"salesfusion.com\">\r\n         <button class=\"submit-button button\" click.trigger=\"runWhoIs()\">Submit</button>\r\n      </div>\r\n   </form>\r\n   </div>\r\n\r\n   <!-- class.bind=\"showResults ? '' : 'hidden'\" -->\r\n   <div class=\"animated fadeIn faster\" class.bind=\"showResults ? '' : 'hidden'\">\r\n\r\n     <!-- DOMAIN INFORMATION CARD -->\r\n      <div class=\"card\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('showDomainInfo')\">\r\n            <p class=\"card-header-title\">\r\n               Domain Information\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\" >\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\"class.bind=\"showDomainInfo ? 'hidden' : ''\"   aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"showDomainInfo ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"showDomainInfo ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <table class=\"table is-bordered is-hoverable is-fullwidth\">\r\n                  <tr>\r\n                     <td class=\"is-bold\">Domain</td>\r\n                     <td>${whoIsResults.whoIs.name}</td>\r\n                  </tr>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Created Date</td>\r\n                     <td>${whoIsResults.whoIs.created}</td>\r\n                  </tr>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Expiration Date</td>\r\n                     <td>${whoIsResults.whoIs.expires}</td>\r\n                  </tr>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Registered</td>\r\n                     <td>${whoIsResults.whoIs.registered}</td>\r\n                  </tr>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Status</td>\r\n                     <td>${whoIsResults.whoIs.status}</td>\r\n                  </tr>\r\n               </table>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!-- DOMAIN INFORMATION CARD END -->\r\n\r\n      <!-- MX INFORMATION CARD -->\r\n       <div class=\"card margin-top\">\r\n          <header class=\"card-header\" click.delegate=\"genericToggle('showMxInfo')\">\r\n             <p class=\"card-header-title\">\r\n                MX Information\r\n             </p>\r\n             <a class=\"card-header-icon\" aria-label=\"more options\" >\r\n             <span class=\"icon\">\r\n             <i class=\"fas fa-angle-down\" class.bind=\"showMxInfo ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n             <i class=\"fas fa-angle-up\" class.bind=\"showMxInfo ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n             </span>\r\n             </a>\r\n          </header>\r\n          <div class=\"card-content animated fadeIn faster\" class.bind=\"showMxInfo ? '' : 'hidden'\">\r\n             <div class=\"content\">\r\n               <table class=\"table is-bordered is-hoverable is-fullwidth\">\r\n                  <thead>\r\n                     <th>Priority</th>\r\n                     <th>Exhange</th>\r\n                  </thead>\r\n                  <tr repeat.for=\"mx of whoIsResults.mx\">\r\n                     <td>${mx.priority}</td>\r\n                     <td>${mx.exchange}</td>\r\n                  </tr>\r\n               </table>\r\n             </div>\r\n          </div>\r\n       </div>\r\n       <!-- MX INFORMATION CARD END -->\r\n\r\n       <!-- REGISTER INFORMATION CARD -->\r\n        <div class=\"card margin-top\">\r\n           <header class=\"card-header\" click.delegate=\"genericToggle('showRegisterInfo')\">\r\n              <p class=\"card-header-title\">\r\n                 Register Information\r\n              </p>\r\n              <a class=\"card-header-icon\" aria-label=\"more options\" >\r\n              <span class=\"icon\">\r\n                <i class=\"fas fa-angle-down\" class.bind=\"showRegisterInfo ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n                <i class=\"fas fa-angle-up\" class.bind=\"showRegisterInfo ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n              </span>\r\n              </a>\r\n           </header>\r\n           <div class=\"card-content animated fadeIn faster\" class.bind=\"showRegisterInfo ? '' : 'hidden'\">\r\n              <div class=\"content\">\r\n                <table class=\"table is-bordered is-hoverable is-narrow is-fullwidth\">\r\n                   <thead>\r\n                      <th style=\"border-right: 0px solid !important;\">Register Information</th>\r\n                      <th style=\"border-left: 0px solid !important;\"></th>\r\n                   </thead>\r\n                   <tr>\r\n                      <td class=\"is-bold\">Email</td>\r\n                      <td>${whoIsResults.whoIs.registrar.email}</td>\r\n                   </tr>\r\n                   <tr>\r\n                      <td class=\"is-bold\">ID</td>\r\n                      <td>${whoIsResults.whoIs.registrar.id}</td>\r\n                   </tr>\r\n                   <tr>\r\n                      <td class=\"is-bold\">Name</td>\r\n                      <td>${whoIsResults.whoIs.registrar.name}</td>\r\n                   </tr>\r\n                   <tr>\r\n                      <td class=\"is-bold\">Phone</td>\r\n                      <td>${whoIsResults.whoIs.registrar.phone}</td>\r\n                   </tr>\r\n                   <tr>\r\n                      <td class=\"is-bold\">URL</td>\r\n                      <td>${whoIsResults.whoIs.registrar.URL}</td>\r\n                   </tr>\r\n                </table>\r\n              </div>\r\n           </div>\r\n        </div>\r\n        <!-- REGISTER INFORMATION CARD END -->\r\n\r\n        <!-- NAME SERVER INFORMATION CARD -->\r\n         <div class=\"card margin-top\">\r\n            <header class=\"card-header\" click.delegate=\"genericToggle('showNameServerInfo')\">\r\n               <p class=\"card-header-title\">\r\n                  Name Server Information\r\n               </p>\r\n               <a class=\"card-header-icon\" aria-label=\"more options\" >\r\n               <span class=\"icon\">\r\n                 <i class=\"fas fa-angle-down\" class.bind=\"showNameServerInfo ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n                 <i class=\"fas fa-angle-up\" class.bind=\"showNameServerInfo ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n               </span>\r\n               </a>\r\n            </header>\r\n            <div class=\"card-content animated fadeIn faster\" class.bind=\"showNameServerInfo ? '' : 'hidden'\">\r\n               <div class=\"content\">\r\n                 <table class=\"table is-bordered is-hoverable is-narrow is-fullwidth\">\r\n                    <thead>\r\n                       <th style=\"border-right: 0px solid !important;\">Name Servers</th>\r\n                       <th style=\"border-left: 0px solid !important;\"></th>\r\n                    </thead>\r\n                    <tr repeat.for=\"server of whoIsResults.whoIs.nameservers\">\r\n                       <td class=\"is-bold\">Server:</td>\r\n                       <td>${server}</td>\r\n                    </tr>\r\n                 </table>\r\n               </div>\r\n            </div>\r\n         </div>\r\n         <!-- NAME SERVER INFORMATION CARD END -->\r\n\r\n      <div class=\"box contacts animated fadeIn faster\" class.bind=\"whoIsResults.whoIs.contacts.admin[0].name ? '' : 'hidden'\">\r\n         <p class=\"is-centered title is-5\">Contacts:</p>\r\n         <p class=\"title is-5 margin-top-extra\">Admin:</p>\r\n         <p><span class=\"is-bold\">Name:</span> ${whoIsResults.whoIs.contacts.admin[0].name}</p>\r\n         <p><span class=\"is-bold\">Organization:</span> ${whoIsResults.whoIs.contacts.admin[0].organization}</p>\r\n         <p><span class=\"is-bold\">Email:</span> ${whoIsResults.whoIs.contacts.admin[0].email}</p>\r\n         <p class=\"title is-5 margin-top-extra\">Owner:</p>\r\n         <p><span class=\"is-bold\">Name:</span> ${whoIsResults.whoIs.contacts.owner[0].name}</p>\r\n         <p><span class=\"is-bold\">Organization:</span> ${whoIsResults.whoIs.owner.admin[0].organization}</p>\r\n         <p><span class=\"is-bold\">Email:</span> ${whoIsResults.whoIs.contacts.owner[0].email}</p>\r\n         <p class=\"title is-5 margin-top-extra\">Tech:</p>\r\n         <p><span class=\"is-bold\">Name:</span> ${whoIsResults.whoIs.contacts.tech[0].name}</p>\r\n         <p><span class=\"is-bold\">Organization:</span> ${whoIsResults.whoIs.contacts.tech[0].organization}</p>\r\n         <p><span class=\"is-bold\">Email:</span> ${whoIsResults.whoIs.contacts.admin[0].tech}</p>\r\n      </div>\r\n\r\n      <div class=\" box text-cont animated fadeIn faster\" class.bind=\"whoIsResults.txt[0].errno ? 'hidden' : ''\">\r\n         <p class=\"title is-5\">Txt Records:</p>\r\n         <p repeat.for=\"record of whoIsResults.txt\"><span class=\"is-bold\">Record: </span>${record}</p>\r\n      </div>\r\n   </div>\r\n</template>\r\n"; });
define('dns/tracking',['exports', 'aurelia-framework', '../src/services/dns-service.js'], function (exports, _aureliaFramework, _dnsService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Index = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Index = exports.Index = (_dec = (0, _aureliaFramework.inject)(_dnsService.DnsService), _dec(_class = function () {
    function Index(DnsService) {
      _classCallCheck(this, Index);

      this.DnsService = DnsService;

      this.domain;
      this.tfObject;

      this.showResults = false;
      this.showError = false;
    }

    Index.prototype.activate = function activate() {};

    Index.prototype.submitController = function submitController() {
      this.addLoader('submit-button');
      this.showResults = false;
      this.showError = false;
      var adjUrl = this.validateInput();
      this.checkTracking(adjUrl);
    };

    Index.prototype.checkTracking = function checkTracking(url) {
      var _this = this;

      this.DnsService.checkDomainTracking(url).then(function (response) {
        console.log(response.data);
        _this.tfObject = response.data;
        _this.showResults = true;
        _this.removeLoader("is-loading");
      });
    };

    Index.prototype.validateInput = function validateInput() {
      if (this.domain.indexOf("https") != -1) {
        return "http" + this.domain.slice(5);
      } else if (this.domain.indexOf(".") == -1) {
        this.showError = true;
        this.showResults = false;
      } else {
        return "http://" + this.domain;
      }
    };

    Index.prototype.addLoader = function addLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass);
      element[0].classList.add("is-loading");
    };

    Index.prototype.removeLoader = function removeLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass);
      element[0].classList.remove("is-loading");
    };

    return Index;
  }()) || _class);
});
define('text!dns/tracking.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"cont animated fadeIn faster\">\n\n        <div class=\"box\">\n        <p class=\"title is-6 is-centered\">Tracking Script Checker</p>\n        </div>\n\n        <div class=\"box\">\n        <form>\n            <div class=\"input-cont is-centered\">\n                <p class=\"title is-6\">Enter a URL</p>\n                <input class=\"input\" placeholder=\"acme.com\" value.bind=\"domain\">\n                <button class=\"submit-button button margin-top\" click.delegate=\"submitController()\">Submit</button>\n            </div>\n        </form>\n        </div>\n\n        <div class=\"box animated fadeIn faster is-centered\" class.bind=\"showError ? '' : 'hidden'\">\n          <p class=\"\"> Please enter a valid domain name!</p>\n        </div>\n\n        <div class=\"box margin-top animated fadeIn faster\" class.bind=\"showResults ? '' : 'hidden'\">\n\n            <article class=\"message has-centered-text\">\n                <div class=\"message-header\">\n                    <p>Results: </p>\n                </div>\n                <div class=\"message-body\">\n                    <div class=\"companies \">\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Act-On:</span></p>\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Click Dimensions: </span></p>\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Google:</span></p>\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Marketo:</span></p>\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Pardot:</span></p>\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Salesfusion:</span></p>\n                        <p class=\"margin-bot\"><span class=\"is-bold\">Hubspot:</span></p>\n                    </div>\n\n                    <div class=\"values-cont\">\n                        <p class=\"tf\" class.bind=\"tfObject.ActOn ? 'true' : 'false'\">${tfObject.ActOn}</p>\n                        <p class=\"tf\" class.bind=\"tfObject.ClickDimensions ? 'true' : 'false'\">${tfObject.ClickDimensions}</p>\n                        <p class=\"tf\" class.bind=\"tfObject.Google ? 'true' : 'false'\">${tfObject.Google}</p>\n                        <p class=\"tf\" class.bind=\"tfObject.Marketo ? 'true' : 'false'\">${tfObject.Marketo}</p>\n                        <p class=\"tf\" class.bind=\"tfObject.Pardot ? 'true' : 'false'\">${tfObject.Pardot}</p>\n                        <p class=\"tf\" class.bind=\"tfObject.Salesfusion ? 'true' : 'false'\">${tfObject.Salesfusion}</p>\n                        <p class=\"tf\" class.bind=\"tfObject.Hubspot ? 'true' : 'false'\">${tfObject.Hubspot}</p>\n                    </div>\n                </div>\n            </article>\n\n\n        </div>\n\n    </div>\n</template>\n"; });
define('dns/dkim',['exports', 'aurelia-framework', '../src/services/dns-service.js'], function (exports, _aureliaFramework, _dnsService) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Dkim = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Dkim = exports.Dkim = (_dec = (0, _aureliaFramework.inject)(_dnsService.DnsService), _dec(_class = function () {
        function Dkim(DnsService) {
            _classCallCheck(this, Dkim);

            this.DnsService = DnsService;

            this.domain;
            this.spfs;
            this.dkim;
            this.spfMessage;

            this.tfSpf = false;
            this.showResults = false;
            this.showExamples = false;
            this.showCheckerResults = true;
            this.showAllText = false;
        }

        Dkim.prototype.compareSpfDkim = function compareSpfDkim(domain) {
            this.showResults = false;
            this.addLoader('submit-button');
            var adjUrl = this.validateInput();
            this.spfMessage = "";
            this.dkimCheck(adjUrl);
            this.spfCheck(adjUrl);
        };

        Dkim.prototype.spfCheck = function spfCheck(url) {
            var _this = this;

            this.DnsService.checkDomainSpf(url).then(function (response) {
                _this.spfs = response.data;
                if (_this.spfs.length >= 2) {
                    _this.tfSpf = false;
                    _this.spfMessage = "Multiple SPF records were found. All SPF records should be combined into a singular record:";
                } else {
                    _this.tfSpf = _this.spfs[0].value;
                }
                _this.removeLoader('is-loading');
            });
        };

        Dkim.prototype.dkimCheck = function dkimCheck(url) {
            var _this2 = this;

            return this.DnsService.checkDomainDkim(url).then(function (response) {
                _this2.dkim = response.data;
                _this2.showResults = true;
            });
        };

        Dkim.prototype.validateInput = function validateInput() {
            if (this.domain.indexOf("https") != -1) {
                return this.domain.slice(8);
            } else if (this.domain.indexOf("http") != -1) {
                return this.domain.slice(7);
            } else {
                return this.domain;
            }
        };

        Dkim.prototype.genericToggle = function genericToggle(attribute) {
            if (this[attribute] == false) {
                this[attribute] = true;
            } else {
                this[attribute] = false;
            }
        };

        Dkim.prototype.addLoader = function addLoader(elementClass) {
            var element = document.getElementsByClassName(elementClass);
            element[0].classList.add("is-loading");
        };

        Dkim.prototype.removeLoader = function removeLoader(elementClass) {
            var element = document.getElementsByClassName(elementClass);
            element[0].classList.remove("is-loading");
        };

        return Dkim;
    }()) || _class);
});
define('text!dns/dkim.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"cont animated fadeIn faster\">\n\n        <div class=\"box\">\n          <p class=\"title is-6 is-centered\">SPF/DKIM Checker</p>\n        </div>\n\n        <!-- FORM FOR TAKING DOMAIN INPUT -->\n        <div class=\"box\">\n          <form>\n            <div class=\"dkim-cont is-centered\">\n                <p class=\"title is-6 \">Enter Your Domain:</p>\n                <input class=\"input\" value.bind=\"domain\" placeholder=\"salesfusion.com\">\n                <button class=\"submit-button button\" click.delegate=\"compareSpfDkim(domain)\">Submit</button>\n            </div>\n        </form>\n        </div>\n        <!-- END FORM FOR TAKING DOMAIN INPUT-->\n\n        <div class=\"card\" class.bind=\"showResults ? '' : 'hidden'\">\n          <header class=\"card-header\">\n            <p class=\"card-header-title\" click.delegate=\"genericToggle('showAllText')\">\n              All Text Records\n            </p>\n            <a class=\"card-header-icon\" aria-label=\"more options\">\n              <span class=\"icon\">\n                <i class=\"fas fa-angle-down\" class.bind=\"showAllText ? 'hidden' : ''\"aria-hidden=\"true\"></i>\n                <i class=\"fas fa-angle-up\" class.bind=\"showAllText ? '' : 'hidden'\" aria-hidden=\"true\"></i>\n              </span>\n            </a>\n          </header>\n          <div class=\"card-content\" class.bind=\"showAllText ? '' : 'hidden'\">\n            <div class=\"content\">\n              <p repeat.for=\"texts of dkim.allText\">${texts}</p>\n            </div>\n          </div>\n        </div>\n\n\n\n        <div class=\"card\" class.bind=\"showResults ? '' : 'hidden'\">\n          <header class=\"card-header\">\n            <p class=\"card-header-title\" click.delegate=\"genericToggle('showCheckerResults')\">\n              Checker Results:\n            </p>\n            <a class=\"card-header-icon\" aria-label=\"more options\">\n              <span class=\"icon\">\n                <i class=\"fas fa-angle-up\" class.bind=\"showCheckerResults ? '' : 'hidden'\" aria-hidden=\"true\"></i>\n                <i class=\"fas fa-angle-down\" class.bind=\"showCheckerResults ? 'hidden' : ''\"  aria-hidden=\"true\"></i>\n              </span>\n            </a>\n          </header>\n          <div class=\"card-content\" class.bind=\"showCheckerResults ? '' : 'hidden'\">\n            <div class=\"content\">\n              <!-- DISPLAY LONG DKIM RESULTS-->\n              <div class=\"animated fadeIn faster\">\n                  <article class=\"message has-centered-text\" class.bind=\"dkim.dkimLongTF ? 'is-success' : 'is-danger'\">\n                      <div class=\"message-header\">\n                          <p>DKIM Long:</p>\n                      </div>\n                      <div class=\"message-body\">\n                          <p class=\"is-bold\">${dkim.messageLong}</p>\n                          <p class=\"\">${dkim.dkimLong}</p>\n                      </div>\n                  </article>\n\n                  <!-- DISPLAY SHORT DKIM RESULTS -->\n                  <article class=\"message has-centered-text\" class.bind=\"dkim.dkimShortTF ? 'is-success' : 'is-danger'\">\n                      <div class=\"message-header\">\n                          <p>DKIM Short:</p>\n                      </div>\n                      <div class=\"message-body\">\n                          <p class=\"is-bold\">${dkim.messageShort}</p>\n                          <p class=\"\">${dkim.dkimShort}</p>\n                      </div>\n                  </article>\n\n\n                  <!-- DISPLAY SPF RESULTS -->\n                  <p class=\"is-warning title is-5 is-centered\">${spfMessage}</p>\n                  <article repeat.for=\"spf of spfs\" class=\"message has-centered-text\" class.bind=\"tfSpf ? 'is-success' : 'is-danger'\">\n                      <div class=\"message-header\">\n                          <p>SPF:</p>\n                      </div>\n                      <div class=\"message-body\">\n                          <p class=\"is-bold\">${spf.message}</p>\n                          <p class=\"\">${spf.results}</p>\n                      </div>\n                  </article>\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <!-- SPF AND SKIM EXAMPLES -->\n\n            <div class=\"card\">\n              <header class=\"card-header\" >\n                <p class=\"card-header-title\" click.delegate=\"genericToggle('showExamples')\">\n                  Examples\n                </p>\n                <a class=\"card-header-icon\" aria-label=\"more options\">\n                <span class=\"icon\">\n                <i class=\"fas fa-angle-down\" class.bind=\"showExamples ? 'hidden' : ''\"  aria-hidden=\"true\"></i>\n                <i class=\"fas fa-angle-up\" class.bind=\"showExamples ? '' : 'hidden'\" aria-hidden=\"true\"></i>\n              </span>\n            </a>\n          </header>\n\n  <div class=\"card-content\" class.bind=\"showExamples ? '' : 'hidden'\">\n    <div class=\"content\">\n      <article class=\"message has-centered-text\">\n          <div class=\"message-header\">\n              <p>Domain Keys: </p>\n          </div>\n          <div class=\"message-body\">\n              <p><span class=\"title is-6 title-no-margin\">DKIM Long:</span> msgapp._domainkey.${domain}</p>\n              <p><span class=\"title is-6 title-no-margin\">DKIM Short:</span> _domainkey.${domain}</p>\n          </div>\n      </article>\n\n      <article class=\"message has-centered-text\">\n          <div class=\"message-header\">\n              <p>DKIM Examples: </p>\n          </div>\n          <div class=\"message-body\">\n              <p class=\"title is-6 title-no-margin\">DKIM Long:</p>\n              <p class=\"margin-bottom\">k=rsa;p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDasswtodxAxfHPmN5hipc7y77k5sGjdO5Pf/4kUZ2wuBd9gxCIpnsTjKS88eXkCf0LHaRvmYwNgECQslOAqdirJIqtM08Hym609p1IbV1+eEHXWU1VTLmDDBmEKrG9nl1nrchZUGaIXzDzlq8kZL+pkvQoIid/DoFHW3GbpN2XvwIDAQAB;</p>\n              <p class=\"title is-6 title-no-margin\">DKIM Short:</p>\n              <p class=\"margin-bottom\">t=y; o=~;'</p>\n          </div>\n      </article>\n\n      <article class=\"message has-centered-text\">\n          <div class=\"message-header\">\n              <p>SPF Example </p>\n          </div>\n          <div class=\"message-body\">\n              <p class=\"title is-6 title-no-margin\">SPF:</p>\n              <p class=\"\">v=spf1 mx include:auth.msgapp.com ~all</p>\n          </div>\n      </article>\n\n    </div>\n  </div>\n\n</div>\n\n</template>\n"; });
define('dns/cname',['exports', 'aurelia-framework', '../src/services/dns-service.js'], function (exports, _aureliaFramework, _dnsService) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Cname = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Cname = exports.Cname = (_dec = (0, _aureliaFramework.inject)(_dnsService.DnsService), _dec(_class = function () {
		function Cname(DnsService) {
			_classCallCheck(this, Cname);

			this.DnsService = DnsService;

			this.cname;
			this.cnameSingular;
			this.results;
			this.resultsSingular;

			this.showSfChecker = true;
			this.showSinglularChecker = false;
			this.showResults = false;
			this.showError = false;
		}

		Cname.prototype.checkCname = function checkCname() {
			var _this = this;

			this.showResults = false;
			this.addLoader("submit-button");
			this.DnsService.checkCname(this.cname).then(function (response) {
				if (response.data == 'Please enter a valid Salesfusion domain') {
					_this.results = response.data;
					_this.showResults = false;
					_this.showError = true;
				} else if (_this.cname == undefined) {
					_this.results = 'Please enter a valid Salesfusion domain';
					_this.showResults = false;
					_this.showError = true;
				} else {
					_this.results = response.data;
					_this.showResults = true;
					_this.showError = false;
				}
				_this.removeLoader('is-loading');
			});
		};

		Cname.prototype.checkCnameSingular = function checkCnameSingular() {
			var _this2 = this;

			this.resultsSingular = false;
			this.addLoader("submit-button-two");
			this.DnsService.checkCnameSingular(this.cnameSingular).then(function (response) {
				_this2.resultsSingular = response.data;
				_this2.removeLoader('is-loading');
			});
		};

		Cname.prototype.addLoader = function addLoader(elementClass) {
			var element = document.getElementsByClassName(elementClass);
			element[0].classList.add("is-loading");
		};

		Cname.prototype.removeLoader = function removeLoader(elementClass) {
			var element = document.getElementsByClassName(elementClass);
			element[0].classList.remove("is-loading");
		};

		Cname.prototype.genericToggle = function genericToggle(attribute) {
			if (this[attribute] == false) {
				this[attribute] = true;
			} else {
				this[attribute] = false;
			}
		};

		return Cname;
	}()) || _class);
});
define('text!dns/cname.html', ['module'], function(module) { module.exports = "<template>\r\n   <div class=\"cont margin-top-extra animated fadeIn faster\">\r\n\r\n      <!-- SF CNAME CHECKER -->\r\n      <div class=\"card\">\r\n\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('showSfChecker')\">\r\n            <p class=\"card-header-title\">\r\n               Salesfusion CNAME Checker\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"showSfChecker ? 'hidden' : ''\" aria-hidden=\"true\" ></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"showSfChecker ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"showSfChecker  ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <form>\r\n                  <div class=\"dkim-cont is-centered\">\r\n                     <p class=\"title is-6 \">Enter a current Salesfusion customer domain name:</p>\r\n                     <input class=\"input\" value.bind=\"cname\" placeholder=\"automate\">\r\n                     <button class=\"submit-button button\" click.delegate=\"checkCname()\">Submit</button>\r\n                  </div>\r\n               </form>\r\n\r\n\r\n               <p class=\"title is-6\" class.bind=\"showError ? '' : 'hidden'\">${results}</p>\r\n               <table class.bind=\"showResults ? '' : 'hidden'\" class=\"table is-striped is-fullwidth is-bordered is-hoverable animated fadeIn faster\">\r\n                  <thead>\r\n                     <th>Name: ${results.customerName} </th>\r\n                     <th>Domain: ${results.domainName} </th>\r\n                     <th>ID: ${results.customerId} </th>\r\n                  </thead>\r\n                  <thead>\r\n                     <th>CNAME Type</th>\r\n                     <th>Base CNAME</th>\r\n                     <th>Resolves To:</th>\r\n                  </thead>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Landing Pages</td>\r\n                     <td>${results.landingPages.cname}</td>\r\n                     <td>${results.landingPages.results}</td>\r\n                  </tr>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Cookie Server</td>\r\n                     <td>${results.cookieServer.cname}</td>\r\n                     <td>${results.cookieServer.results}</td>\r\n                  </tr>\r\n                  <tr>\r\n                     <td class=\"is-bold\">Campaign Links</td>\r\n                     <td>${results.campaignLinks.cname}</td>\r\n                     <td>${results.campaignLinks.results}</td>\r\n                  </tr>\r\n               </table>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!-- SF CNAME CHECKER -->\r\n\r\n      <!-- SINGULAR CNAME CHECKER -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('showSinglularChecker')\">\r\n            <p class=\"card-header-title\">\r\n               Singular CNAME Checker\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"showSinglularChecker ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"showSinglularChecker ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"showSinglularChecker ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n\r\n               <form>\r\n                  <div class=\"dkim-cont is-centered\">\r\n                     <p class=\"title is-6 \">Enter a specific CNAME:</p>\r\n                     <input class=\"input\" value.bind=\"cnameSingular\" placeholder=\"info.acme.com\">\r\n                     <button class=\"submit-button-two button\" click.delegate=\"checkCnameSingular()\">Submit</button>\r\n                  </div>\r\n               </form>\r\n               <article class=\"message has-centered-text\" class.bind=\"resultsSingular ? '' : 'hidden'\">\r\n                  <div class=\"message-header\">\r\n                     <p>Results: </p>\r\n                  </div>\r\n                  <div class=\"message-body\">\r\n                    <p class=\"title is-5\">${resultsSingular}</p>\r\n                  </div>\r\n               </article>\r\n\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!-- SINGULAR CNAME CHECKER -->\r\n\r\n   </div>\r\n</template>\r\n"; });
define('customer',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Customer = exports.Customer = function () {
    function Customer() {
      _classCallCheck(this, Customer);
    }

    Customer.prototype.activate = function activate() {};

    return Customer;
  }();
});
define('text!customer.html', ['module'], function(module) { module.exports = "<template>\r\n   <div class=\"box cont animated fadeIn faster\">\r\n      <iframe scrolling=\"no\" class=\"ifr\" src=\"http://10.0.2.209/Customer\" width=\"1150\" height=\"1000\"></iframe>\r\n   </div>\r\n</template>\r\n"; });
define('customer-specific/drt',['exports', 'aurelia-framework', '../src/services/reset-service.js', '../src/services/connect-string-converter.js'], function (exports, _aureliaFramework, _resetService, _connectStringConverter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DRT = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var DRT = exports.DRT = (_dec = (0, _aureliaFramework.inject)(_resetService.ResetService, _connectStringConverter.ConnectStringConverter), _dec(_class = function () {
    function DRT(ResetService, ConnectStringConverter) {
      _classCallCheck(this, DRT);

      this.ResetService = ResetService;
      this.ConnectStringConverter = ConnectStringConverter;

      this.customer;
      this.error;
      this.results;
      this.email;

      this.showResults = false;
      this.showInput = true;
    }

    DRT.prototype.activate = function activate(params) {
      this.slug = params.slug;
      this.customer = this.ConnectStringConverter.convertUtmString(this.slug);
    };

    DRT.prototype.attached = function attached() {
      this.populateSelectButton();
      this.inputToggle();
    };

    DRT.prototype.runDrtCheck = function runDrtCheck() {
      var _this = this;

      this.addLoader("submit-button");
      this.showResults = false;
      this.error = false;
      this.ResetService.drt(this.email, this.customer.server, this.customer.database).then(function (response) {
        if (response.data == "This record does not exist within the customers database.") {
          _this.error = "This record does not exist within the customers database.";
          _this.showResults = false;
        } else {
          _this.results = response.data;
          _this.showResults = true;
          _this.error = '';
        }
        _this.removeLoader("is-loading");
      });
    };

    DRT.prototype.genericUpdates = function genericUpdates(serviceFunction, key) {
      var _this2 = this;

      this.addLoader(key);
      serviceFunction(this.email, this.customer.server, this.customer.database).then(function (response) {
        _this2.results[key].value = false;
        _this2.removeLoader('is-loading');
      });
    };

    DRT.prototype.addLoader = function addLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass);
      element[0].classList.add("is-loading");
    };

    DRT.prototype.removeLoader = function removeLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass);
      element[0].classList.remove("is-loading");
    };

    DRT.prototype.inputToggle = function inputToggle() {
      var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText;
      if (currentCustomer) {
        this.showInput = false;
      } else {
        this.showInput = true;
      }
    };

    DRT.prototype.populateSelectButton = function populateSelectButton() {
      var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText;
      var button = document.getElementsByClassName('customer-button');
      if (currentCustomer == "") {
        document.getElementsByClassName('customer-button')[0].innerText = "Select a Customer";
      } else {
        document.getElementsByClassName('customer-button')[0].innerText = currentCustomer;
      }
    };

    return DRT;
  }()) || _class);
});
define('text!customer-specific/drt.html', ['module'], function(module) { module.exports = "<template>\r\n   <div class=\"cont\">\r\n      <div class=\"box animated fadeIn faster\">\r\n         <p class=\"title is-6 is-centered\">Deliverability Reset Tool</p>\r\n      </div>\r\n      <div class=\"box is-centered animated fadeIn faster\" class.bind=\"showInput ? '' : 'hidden'\">\r\n         <p class=\"title is-6\">Please Select a Customer</p>\r\n      </div>\r\n      <div class=\"box is-centered animated fadeIn faster\" class.bind=\"showInput ? 'hidden' : ''\">\r\n         <p class=\"title is-6 is-centered\">Current Customer: <span class=\"current-customer\">${customer.customerName}</span></p>\r\n         <p class=\"margin-top-extra\">Enter an email address:</p>\r\n         <form>\r\n            <input class=\"input margin-auto\" value.bind=\"email\" placeholder=\"tj.southern@salesfusion.com\"></input>\r\n            <button class=\"submit-button button\" click.delegate=\"runDrtCheck()\">Submit</button>\r\n         </form>\r\n      </div>\r\n      <div class=\"box\" class.bind=\"error ? '' : 'hidden'\">\r\n         <p class=\"title is-6\">${error}</p>\r\n      </div>\r\n      <div class=\"box animated fadeIn faster\" class.bind=\"showResults ? '' : 'hidden'\">\r\n         <table class.bind=\"showResults ? '' : 'hidden'\" class=\"drt-table table is-striped is-fullwidth   is-narrow animated fadeIn faster\">\r\n            <thead>\r\n               <th>Check Type:</th>\r\n               <th>Message:</th>\r\n               <th>Reset:</th>\r\n            </thead>\r\n            <tr>\r\n               <td class.bind=\"results.deleted.value ? 'warning-table' : 'true-table'\" class=\"is-bold\">Deleted:</td>\r\n               <td>${results.deleted.message}</td>\r\n               <td></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.emailValidation.value ? 'false-table' : 'true-table'\" class=\"is-bold\">Email Validation:</td>\r\n               <td>${results.emailValidation.message}</td>\r\n               <td><button class.bind=\"results.emailValidation.value ? '' : 'hidden'\" class=\"button reset-button emailValidation\"\r\n                 click.trigger=\"genericUpdates(ResetService.emailValidation, 'emailValidation')\">Reset</button></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.guardedWatch.value ? 'false-table' : 'true-table'\" class=\"is-bold\">Guarded Watch:</td>\r\n               <td>${results.guardedWatch.message}</td>\r\n               <td><button class.bind=\"results.guardedWatch.value ? '' : 'hidden'\" class=\"button reset-button guardedWatch\"\r\n                 click.trigger=\"genericUpdates(ResetService.guardedWatch, 'guardedWatch')\">Reset</button></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.supressionList.value ? 'false-table' : 'true-table'\" class=\"is-bold\">Supression List:</td>\r\n               <td>${results.supressionList.message}</td>\r\n               <td><button class.bind=\"results.supressionList.value ? '' : 'hidden'\" class=\"button reset-button supressionList\"\r\n                 click.trigger=\"genericUpdates(ResetService.updateSupression, 'supressionList')\">Reset</button></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.optOut.value ? 'false-table' : 'true-table'\" class=\"is-bold\">Opted Out:</td>\r\n               <td>${results.optOut.message}</td>\r\n               <td><button class.bind=\"results.optOut.value ? '' : 'hidden'\" class=\"button reset-button optOut\"\r\n                 click.trigger=\"genericUpdates(ResetService.updateOptout, 'optOut')\">Reset</button></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.systemSoftBounce.value ? 'false-table' : 'true-table'\" class=\"is-bold\">Soft Bounces:</td>\r\n               <td>${results.systemSoftBounce.message}</td>\r\n               <td><button class.bind=\"results.systemSoftBounce.value ? '' : 'hidden'\" class=\"button reset-button systemSoftBounce\"\r\n                 click.trigger=\"genericUpdates(ResetService.updateSoftBounce, 'systemSoftBounce')\">Reset</button></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.emailDeliveryStatus.value ? 'false-table' : 'true-table'\" class=\"is-bold\">Hard Bounces:</td>\r\n               <td>${results.emailDeliveryStatus.message}</td>\r\n               <td><button class.bind=\"results.emailDeliveryStatus.value ? '' : 'hidden'\" class=\"button reset-button emailDeliveryStatus\"\r\n                 click.trigger=\"genericUpdates(ResetService.updateHardBounce, 'emailDeliveryStatus')\">Reset</button></td>\r\n            </tr>\r\n            <tr>\r\n               <td class.bind=\"results.delStatus.value ? 'false-table' : 'true-table'\" class=\"is-bold\">DelStatus:</td>\r\n               <td>${results.delStatus.message}</td>\r\n               <td><button class.bind=\"results.delStatus.value ? '' : 'hidden'\" class=\"button reset-button delStatus\"\r\n                 click.trigger=\"genericUpdates(ResetService.updateDelstatus, 'delStatus')\">Reset</button></td>\r\n            </tr>\r\n         </table>\r\n      </div>\r\n   </div>\r\n</template>\r\n"; });
define('customer-specific/csc',['exports', 'aurelia-framework', '../src/services/service.js', '../src/services/connect-string-converter.js'], function (exports, _aureliaFramework, _service, _connectStringConverter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Csc = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Csc = exports.Csc = (_dec = (0, _aureliaFramework.inject)(_service.BackendService, _connectStringConverter.ConnectStringConverter), _dec(_class = function () {
		function Csc(BackendService, ConnectStringConverter) {
			_classCallCheck(this, Csc);

			this.BackendService = BackendService;
			this.ConnectStringConverter = ConnectStringConverter;

			this.customer;
			this.results;
			this.inputVal;
			this.campaign_id;
			this.campaignCount;
			this.percentage = 0;
			this.timerOn = false;
			this.timerButton = 'OFF';
			this.pendingEmails = 0;

			this.showResults = false;
			this.showOverView = true;
			this.showExists = false;
			this.showPercentage = false;
			this.showRecipientCount = false;
			this.showLists;
		}

		Csc.prototype.activate = function activate(params) {
			this.slug = params.slug;
			this.customer = this.ConnectStringConverter.convertUtmString(this.slug);
		};

		Csc.prototype.attached = function attached() {
			this.populateSelectButton();
			this.inputToggle();
		};

		Csc.prototype.init = function init() {
			if (this.inputVal == undefined) {
				alert("Please Enter a Valid Campaign ID.");
			} else {
				this.campaign_id = this.inputVal;
				this.addLoader("submit-button");
				this.getCampaignStatusInit();
			}
		};

		Csc.prototype.getCampaignStatusInit = function getCampaignStatusInit() {
			var _this = this;

			this.turnTimerOff();
			this.showRecipientCount = false;
			this.showPercentage = false;
			this.showResults == false;
			return this.BackendService.csc(this.campaign_id, this.customer.server, this.customer.database).then(function (response) {
				_this.results = response.data;
				if (_this.results.campaignerOverview.length == 0) {
					_this.showExists = true;
				} else {
					_this.showexists = false;
					_this.getCampaignCount(_this.campaign_id);
					_this.getNumOfPendingEmails(response.data.campaignerActualCount);
					_this.showResults = true;
				}
				_this.removeLoader("is-loading");
			});
		};

		Csc.prototype.getCampaignStatusSecondary = function getCampaignStatusSecondary() {
			var _this2 = this;

			return this.BackendService.csc(this.campaign_id, this.customer.server, this.customer.database).then(function (response) {
				_this2.results = response.data;
				_this2.getNumOfPendingEmails(response.data.campaignerActualCount);
				_this2.removeLoader("is-loading");
			});
		};

		Csc.prototype.getCampaignCount = function getCampaignCount(id) {
			var _this3 = this;

			return this.BackendService.campaignCount(id, this.customer.domainName).then(function (response) {
				_this3.campaignCount = response.data.count;
				_this3.showRecipientCount = true;
			});
		};

		Csc.prototype.getNumOfPendingEmails = function getNumOfPendingEmails(array) {
			var _this4 = this;

			this.pendingEmails = 0;
			array.forEach(function (data) {
				if (data.status == 1337) {
					_this4.pendingEmails = data.count;
				}
			});
		};

		Csc.prototype.getCampaignPercentage = function getCampaignPercentage() {
			var counts = document.getElementsByClassName('counts');
			var sum = 0;
			for (var _iterator = counts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
				var _ref;

				if (_isArray) {
					if (_i >= _iterator.length) break;
					_ref = _iterator[_i++];
				} else {
					_i = _iterator.next();
					if (_i.done) break;
					_ref = _i.value;
				}

				var count = _ref;

				sum += parseInt(count.innerText);
			}
			var total = sum - this.pendingEmails;
			var percentage = total / this.campaignCount * 100;
			this.percentage = percentage.toFixed(2);
			this.showPercentage = true;
		};

		Csc.prototype.controlTimer = function controlTimer() {
			if (this.timerOn == true) {
				this.timerOn = false;
				document.getElementsByClassName('toggle-button')[0].innerText = 'OFF';
				this.cancelTimer();
			} else {
				this.timerOn = true;
				document.getElementsByClassName('toggle-button')[0].innerText = 'ON';
				this.getCampaignStatusSecondary();
				this.getCampaignPercentage();
				this.startTimer();
				this.globalTimout();
			}
		};

		Csc.prototype.turnTimerOff = function turnTimerOff() {
			this.timerOn = false;
			document.getElementsByClassName('toggle-button')[0].innerText = 'OFF';
			this.cancelTimer();
		};

		Csc.prototype.startTimer = function startTimer() {
			var vm = this;
			var numOfSeconds = document.getElementsByClassName('num-input')[0].value * 1000;
			setInterval(function () {
				vm.addLoader("toggle-button");
				vm.getCampaignStatusSecondary().then(function () {
					vm.getCampaignPercentage();
				});
			}, numOfSeconds);
		};

		Csc.prototype.cancelTimer = function cancelTimer() {
			var highestTimeoutId = setTimeout(";");
			for (var i = 0; i < highestTimeoutId; i++) {
				clearTimeout(i);
			}
		};

		Csc.prototype.globalTimout = function globalTimout() {
			var vm = this;
			setTimeout(function () {
				vm.timerOn = false;
				document.getElementsByClassName('toggle-button')[0].innerText = 'OFF';
				vm.cancelTimer();
			}, 900000);
		};

		Csc.prototype.addLoader = function addLoader(elementClass) {
			var element = document.getElementsByClassName(elementClass);
			element[0].classList.add("is-loading");
		};

		Csc.prototype.removeLoader = function removeLoader(elementClass) {
			var element = document.getElementsByClassName(elementClass);
			element[0].classList.remove("is-loading");
		};

		Csc.prototype.genericToggle = function genericToggle(attribute) {
			if (this[attribute] == false) {
				this[attribute] = true;
			} else {
				this[attribute] = false;
			}
		};

		Csc.prototype.inputToggle = function inputToggle() {
			var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText;
			if (currentCustomer == "") {
				this.showInput = false;
			} else {
				this.showInput = true;
			}
		};

		Csc.prototype.populateSelectButton = function populateSelectButton() {
			var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText;
			var button = document.getElementsByClassName('customer-button');
			if (currentCustomer == "") {
				document.getElementsByClassName('customer-button')[0].innerText = "Select a Customer";
			} else {
				document.getElementsByClassName('customer-button')[0].innerText = currentCustomer;
			}
		};

		return Csc;
	}()) || _class);
});
define('text!customer-specific/csc.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <div class=\"cont is-centered\">\r\n\r\n        <div class=\"box animated fadeIn faster\">\r\n            <p class=\"title is-6 is-centered\">Campaign Monitor</p>\r\n        </div>\r\n        <div class=\"box is-centered animated fadeIn faster\" class.bind=\"showInput ? 'hidden' : ''\">\r\n            <p class=\"title is-6\">Please Select a Customer</p>\r\n        </div>\r\n        <div class=\"box is-centered\" class.bind=\"showInput ? '' : 'hidden'\">\r\n            <p class=\"title is-6 is-centered\">Current Customer: <span class=\"current-customer\">${customer.customerName}</span></p>\r\n            <p class=\"margin-top-extra\">Enter a Campaign ID:</p>\r\n            <form>\r\n                <input class=\"input margin-auto\" type=\"number\" value.bind=\"inputVal\" placeholder=\"123\">\r\n                <button class=\"submit-button button\" click.trigger=\"init()\">Submit</button>\r\n            </form>\r\n        </div>\r\n\r\n        <article class=\"message is-danger is-centered animated fadeIn faster\" class.bind=\"showExists ? '' : 'hidden'\">\r\n            <div class=\"message-header\">\r\n                <p>The Specified campaign does not exist.</p>\r\n            </div>\r\n        </article>\r\n\r\n        <div class=\"animated fadeIn faster\" class.bind=\"showResults ? '' : 'hidden'\">\r\n\r\n          <div class=\"box animated fadeIn faster\" class.bind=\"results.message ? 'hidden' : ''\">\r\n            <div class=\"\" class.bind=\"showRecipientCount ? '' : 'hidden'\">\r\n              <span class=\"tool-text\">Auto Refresh:</span>\r\n              <button class=\"button toggle-button\" click.delegate=\"controlTimer()\" class.bind=\"timerOn ? 'is-success' : 'is-danger'\">${timerButton}</button>\r\n              <span class=\"tool-text\">Seconds to Refresh:</span>\r\n              <input class=\"num-input input\" value=\"15\" min=\"15\" class=\"input\" type=\"number\" />\r\n            </div>\r\n\r\n            <div class=\"animated fadeIn faster\" class.bind=\"showRecipientCount ? 'hidden' : ''\">\r\n                <p class=\"title is-6\">Retrieving Recipient Count...</p>\r\n            </div>\r\n\r\n              <div class=\"animated fadeIn faster\" class.bind=\"showPercentage ? '' : 'hidden'\">\r\n                  <p class=\"title is-6 margin-top-extra animated fadeIn faster\">Percentage Sent: ${percentage}</p>\r\n                  <progress class=\"progress margin-top extra is-success animated fadeIn faster\" value=\"${percentage}\" max=\"100\"></progress>\r\n              </div>\r\n          </div>\r\n\r\n            <!--BEGIN CAMPAIGN OVERVIEWS -->\r\n            <div class=\"card margin-top\">\r\n                <header class=\"card-header\" click.delegate=\"genericToggle('showOverView')\">\r\n                    <p class=\"card-header-title\">\r\n                        Campaign Overview:\r\n                    </p>\r\n                    <a class=\"card-header-icon\" aria-label=\"more options\">\r\n                        <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" aria-hidden=\"true\"></i>\r\n            </span>\r\n                    </a>\r\n                </header>\r\n                <div class=\"card-content animated fadeIn faster\" class.bind=\"showOverView ? '' : 'hidden'\">\r\n                    <div class=\"content\">\r\n\r\n                      <!--BEGIN Campaign Message -->\r\n                        <article class=\"message is-warning is-centered\" class.bind=\"results.message ? '' : 'hidden'\">\r\n                            <div class=\"message-header\">\r\n                                <p>${results.message}</p>\r\n                            </div>\r\n                        </article>\r\n                        <!--END Campaign Message -->\r\n                        <!--BEGIN Campaign OverView Message -->\r\n                        <table class=\"table\">\r\n                            <thead>\r\n                                <th>Campaign Name</th>\r\n                                <th>Subject</th>\r\n                                <th>PostDate</th>\r\n                                <th>Status</th>\r\n                                <th>Tool</th>\r\n                                <th class.bind=\"campaignCount ? '' : 'hidden'\">Count</th>\r\n                            </thead>\r\n\r\n                            <tbody>\r\n                                <tr>\r\n                                    <td>${results.campaignerOverview[0].campaignname}</td>\r\n                                    <td>${results.campaignerOverview[0].subject}</td>\r\n                                    <td>${results.campaignerOverview[0].postdate}</td>\r\n                                    <td>${results.campaignerOverview[0].status}</td>\r\n                                    <td>${results.campaignerOverview[0].tool}</td>\r\n                                    <td class.bind=\"campaignCount ? '' : 'hidden'\">${campaignCount}</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                        <!--END Campaign OverView Message -->\r\n                        <!--BEGIN Campaigner Actual Counts -->\r\n                        <div class=\"table-cont\">\r\n                            <p class=\"title is-6 margin-top-extra\"> Campaigner Actual Counts</p>\r\n                            <table class=\"table\">\r\n                                <tbody>\r\n                                    <tr>\r\n                                        <th>Status</th>\r\n                                        <th repeat.for=\"result of results.campaignerActualCount\">${result.status}</th>\r\n                                    </tr>\r\n                                    <tr>\r\n                                        <th>Count</th>\r\n                                        <td repeat.for=\"result of results.campaignerActualCount\" class=\"counts\">${result.count}</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                        <!--END Campaigner Actual Counts -->\r\n                        <!--BEGIN Campaigner Staging Counts -->\r\n                        <div class=\"table-cont\">\r\n                            <p class=\"title is-6 margin-top-extra\">Campaigner Staging Counts</p>\r\n                            <table class=\"table\">\r\n                                <thead>\r\n                                    <th>Stage 1</th>\r\n                                    <th>Stage 2</th>\r\n                                    <th>Stage 3</th>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr repeat.for=\"result of results.campaignerStagingCount\">\r\n                                        <td>${result.Stage1}</td>\r\n                                        <td class=\"total-recipients\">${result.Stage2}</td>\r\n                                        <td>${result.Stage3}</td>\r\n                                    </tr>\r\n                                    <tr class.bind=\"results.campaignerStagingCount[0].Stage1 ? 'hidden' : ''\">\r\n                                        <td>Campaign is not staging</td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                        <!--END Campaigner Staging Counts -->\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!--END CAMPAIGN OVERVIEWS -->\r\n\r\n            <!--BEGIN LISTS -->\r\n            <div class=\"card margin-top\">\r\n                <header class=\"card-header\" click.trigger=\"genericToggle('showLists')\">\r\n                    <p class=\"card-header-title\">\r\n                        Campaigner Lists:\r\n                    </p>\r\n                    <a class=\"card-header-icon\" aria-label=\"more options\">\r\n                        <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" aria-hidden=\"true\"></i>\r\n            </span>\r\n                    </a>\r\n                </header>\r\n                <div class=\"card-content animated fadeIn faster\" class.bind=\"showLists ? '' : 'hidden'\">\r\n                    <div class=\"content\">\r\n                        <table class=\"table \">\r\n                            <thead>\r\n                                <th>List ID</th>\r\n                                <th>List Type</th>\r\n                                <th>List Action</th>\r\n                                <th>CreatedDate</th>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr repeat.for=\"result of results.campaignerLists\">\r\n                                    <td>${result.ListID}</td>\r\n                                    <td>${result.ListType}</td>\r\n                                    <td>${result.ListAction}</td>\r\n                                    <td>${result.CreatedDate}</td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!--END CAMPAIGNER LISTS -->\r\n        </div>\r\n\r\n</template>\r\n"; });
define('customer-specific/cqt',['exports', 'aurelia-framework', '../src/services/service.js', '../src/services/connect-string-converter.js'], function (exports, _aureliaFramework, _service, _connectStringConverter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CQT = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var CQT = exports.CQT = (_dec = (0, _aureliaFramework.inject)(_service.BackendService, _connectStringConverter.ConnectStringConverter), _dec(_class = function () {
		function CQT(BackendService, ConnectStringConverter) {
			_classCallCheck(this, CQT);

			this.BackendService = BackendService;
			this.ConnectStringConverter = ConnectStringConverter;

			this.customer;
			this.email;
			this.errorMessage;
			this.keys;
			this.resultsNum;
			this.results = [];

			this.showInput = true;
			this.showResults = false;
			this.table;
			this.dragger;
		}

		CQT.prototype.activate = function activate(params) {
			this.slug = params.slug;
			this.customer = this.ConnectStringConverter.convertUtmString(this.slug);
		};

		CQT.prototype.attached = function attached() {
			this.populateSelectButton();
			this.inputToggle();
		};

		CQT.prototype.runCqt = function runCqt() {
			var _this = this;

			this.triggerInteractions();
			this.BackendService.cqt(this.email, this.customer.server, this.customer.database).then(function (response) {
				if (response.data == "This record does not exist within the customer's database.") {
					_this.errorMessage = "This record does not exist within the customer's database.";
					_this.removeLoader();
				} else {
					_this.keys = Object.keys(response.data[0]);
					response.data.forEach(function (data) {
						var tempArray = new Array();
						tempArray.push(Object.values(data));
						_this.results.push(tempArray[0]);
						_this.showResults = true;
					});
				}
				_this.removeLoader();
				_this.makeTableDraggable();
			});
		};

		CQT.prototype.exportToExcel = function exportToExcel(table, name) {
			var uri = 'data:application/vnd.ms-excel;base64,',
			    template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
			    base64 = function base64(s) {
				return window.btoa(unescape(encodeURIComponent(s)));
			},
			    format = function format(s, c) {
				return s.replace(/{(\w+)}/g, function (m, p) {
					return c[p];
				});
			};
			if (!table.nodeType) table = document.getElementById(table);
			var ctx = {
				worksheet: name || 'Worksheet',
				table: table.innerHTML
			};
			window.location.href = uri + base64(format(template, ctx));
		};

		CQT.prototype.makeTableDraggable = function makeTableDraggable() {
			this.table = document.getElementById('exportTable');
			console.log(this.table);
			this.dragger = tableDragger(this.table, {
				mode: 'free',
				dragHandler: '.handle',
				onlyBody: true,
				animation: 300
			});
			console.log(this.dragger);
		};

		CQT.prototype.dragColumn = function dragColumn() {
			this.dragger.on('drop', function (from, to) {
				console(from);
				console(to);
			});
		};

		CQT.prototype.triggerInteractions = function triggerInteractions() {
			var element = document.getElementsByClassName("submit-button");
			element[0].classList.add("is-loading");
			this.errorMessage = false;
			this.showResults = false;
			this.results = [];
		};

		CQT.prototype.removeLoader = function removeLoader() {
			var element = document.getElementsByClassName("submit-button");
			element[0].classList.remove("is-loading");
		};

		CQT.prototype.inputToggle = function inputToggle() {
			var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText;
			if (currentCustomer == "") {
				this.showInput = false;
			} else {
				this.showInput = true;
			}
		};

		CQT.prototype.populateSelectButton = function populateSelectButton() {
			var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText;
			var button = document.getElementsByClassName('customer-button');
			if (currentCustomer == "") {
				document.getElementsByClassName('customer-button')[0].innerText = "Select a Customer";
			} else {
				document.getElementsByClassName('customer-button')[0].innerText = currentCustomer;
			}
		};

		return CQT;
	}()) || _class);
});
define('text!customer-specific/cqt.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div class=\"cont animated fadeIn faster\">\r\n\t\t<div class=\"box\">\r\n\t\t\t<p class=\"title is-6 is-centered\">Contact Query Tool</p>\r\n\t\t</div>\r\n\t\t<div class=\"box is-centered\" class.bind=\"showInput ? 'hidden' : ''\">\r\n\t\t\t<p class=\"title is-6\">Please Select a Customer</p>\r\n\t\t</div>\r\n\t\t<div class=\"box is-centered\" class.bind=\"showInput ? '' : 'hidden'\">\r\n\t\t\t<p class=\"title is-6 is-centered\">Current Customer: <span class=\"current-customer\">${customer.customerName}</span></p>\r\n\t\t\t<p class=\"margin-top-extra\">Enter an email address:</p>\r\n\t\t\t<form>\r\n\t\t\t\t<input class=\"input margin-auto\" value.bind=\"email\" placeholder=\"tj.southern@salesfusion.com\"></input>\r\n\t\t\t\t<button class=\"submit-button button\" click.delegate=\"runCqt()\">Submit</button>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\r\n  <div  click.trigger=\"exportToExcel('exportTable','Record Inforamtion')\" class.bind=\"showResults ? '' : 'hidden'\" class=\"button download-to-excel\">\r\n    <i class=\"fas fa-file-excel\"></i>\r\n  </div>\r\n\r\n\t<div class=\"box is-centered animated fadeIn faster\" class.bind=\"errorMessage ? '' : 'hidden'\">\r\n\t\t<p class=\"title is-6\">${errorMessage}</p>\r\n\t</div>\r\n\r\n</div>\r\n\r\n\t<div class=\"animated fadeIn faster\" class.bind=\"showResults ? '' : 'hidden'\">\r\n\t\t<table id=\"exportTable\" class=\"table is-striped is-narrow animated fadeIn faster\">\r\n\t\t\t<thead class=\"handle clickable\" click.trigger=\"dragColumn()\">\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th repeat.for=\"key of keys\">${key}</th>\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tr repeat.for=\"result of results\">\r\n\t\t\t\t<td repeat.for=\"item of result\">${item}</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n\r\n</template>\r\n"; });
define('text!css/main.css', ['module'], function(module) { module.exports = "/*----- GLOBAL STYLES ----- */\r\n\r\n.hidden {\r\n display: none !important;\r\n}\r\n\r\nbutton.hidden {\r\n display: none !important;\r\n}\r\n\r\nbutton{\r\n  box-shadow: none !important;\r\n  outline: black !important;\r\n}\r\n\r\na:hover {\r\n  color: black !important;\r\n}\r\n\r\nhtml {\r\n  height: 100%;\r\n  background: #0B486B;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #F56217, #0B486B);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #F56217, #0B486B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\ntd:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.card-header:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n.gradient {\r\n  background: #0B486B;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #F56217, #0B486B);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #F56217, #0B486B); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\ni.fas:hover{\r\n  color: #1a2a6c !important;\r\n}\r\n\r\nhr {\r\n  height: 2.5px;\r\n  width: 80%;\r\n  margin: 20px auto;\r\n  background: grey;  /* fallback for old browsers */\r\n}\r\n\r\n.cont {\r\n  max-width: 1200px !important;\r\n  margin: 20px auto;\r\n  word-wrap: break-word !important;\r\n}\r\n\r\n.is-danger {\r\n  word-break: break-all !important;\r\n}\r\n\r\ninput {\r\n  width: 400px !important;\r\n  text-align: center !important;\r\n}\r\n\r\n.button {\r\n  display: block !important;\r\n  margin: 10px auto !important;\r\n}\r\n\r\n.card:hover {\r\n    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n}\r\n\r\n.box {\r\n  border-radius: 1px !important;\r\n}\r\n\r\n.box {\r\n  margin: 15px auto !important;\r\n  margin-bottom: 15px !important;\r\n  width: 90% !important;\r\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n}\r\n\r\n.card{\r\n  width: 90%;\r\n  margin: 15px auto;\r\n}\r\n\r\nh2 {\r\n  font-size: 140%;\r\n  font-weight: 500;\r\n  margin-top: 5px;\r\n}\r\n\r\n.title.is-5 {\r\n  margin-bottom: 5px;\r\n}\r\n/*----- END GLOBAL CLASS STYLES ----- */\r\n/* -------------------------------------------------------------------------------- */\r\n/*----- BEGIN RE-UASBLE CLASS STYLES ----- */\r\n\r\n.margin-auto {\r\n  margin: auto !important;\r\n}\r\n\r\n.margin-top {\r\n  margin-top: 10px !important;\r\n}\r\n\r\n.margin-top-extra {\r\n  margin-top: 20px;\r\n}\r\n\r\n.margin-top-major {\r\n  margin-top: 40px;\r\n}\r\n\r\n.margin-bot {\r\n  margin-bottom: 2px;\r\n}\r\n\r\n\r\n.white {\r\n  color: white !important;\r\n}\r\n\r\n.is-bold {\r\n  font-weight: bold;\r\n  margin-bottom: 2px !important;\r\n}\r\n\r\n.title-no-margin {\r\n  margin-bottom: 2px !important;\r\n}\r\n\r\n.margin-bottom {\r\n  margin-bottom: 10px;\r\n}\r\n\r\n.padding-left {\r\n  padding-left: 5px;\r\n}\r\n\r\n.is-centered {\r\n  text-align: center !important;\r\n}\r\n\r\n.inline-block {\r\n  display: inline-block !important;\r\n}\r\n\r\n.width-ninty-five{\r\n  width: 95% !important;\r\n}\r\n\r\n.margin-five {\r\n  margin: 5px !important;\r\n}\r\n/*----- END RE-UASBLE STYLES ----- */\r\n/* -------------------------------------------------------------------------------- */\r\n/*-----BEGIN NAV BAR STYLES ----- */\r\n.logo-padding {\r\n  padding-top: 0px !important;\r\n  padding-bottom: 10px !important;\r\n}\r\n\r\nnav {\r\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n}\r\n\r\n.margin-right-dropdown {\r\n  margin-right: 28px !important\r\n}\r\n\r\n.dropdown-content{\r\n  text-align: center !important;\r\n}\r\n\r\n.version {\r\n  padding-right: 8px;\r\n  line-height: 50px;\r\n}\r\n\r\n.logo {\r\n  display: -webkit-inline-box !important;\r\n}\r\n\r\n.toggle-button{\r\n  display: inline-block !important;\r\n  width: auto !important;\r\n  margin: 0px !important;\r\n}\r\n\r\n.mode-button{\r\n  width: 150px !important;\r\n  margin: 7px 10px !important;\r\n}\r\n\r\n.reset-button{\r\n  height: 19px !important;\r\n  line-height: 5px !important;\r\n  margin: 0px !important;\r\n}\r\n\r\n.mode-two-button{\r\n  margin: 7px 10px !important;\r\n}\r\n\r\n.selected {\r\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\r\n  transition: all 0.3s cubic-bezier(.25,.8,.25,1);\r\n}\r\n/*-----END NAV BAR STYLES ----- */\r\n/* -------------------------------------------------------------------------------- */\r\n/*-----BEGIN TABLE STYLES ----- */\r\ntable {\r\n  margin-top: 10px;\r\n  margin-right: 5px;\r\n  margin-left: 5px;\r\n  font-size: 12px !important;\r\n}\r\n\r\nth{\r\n  background: #555;\r\n  color: #FFF !important;\r\n}\r\n\r\n.table-margin {\r\n  margin: 0px !important\r\n}\r\n\r\n.cqt-results {\r\n  overflow: scroll !important;\r\n}\r\n\r\n.table-cont {\r\n  width:49% !important;\r\n  display: inline-block;\r\n  overflow: hidden !important;\r\n}\r\n\r\n#exportTable {\r\n  font-size: 12px !important;\r\n  margin: 0 auto;\r\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n}\r\n/*-----END TABLE STYLES ----- */\r\n/* -------------------------------------------------------------------------------- */\r\n/*-----BEGIN PAGE SPECIFIC STYLES ----- */\r\nbutton.excel-button {\r\n  display: inline-block !important;\r\n  margin: 0px 0px 0px 70px !important;\r\n}\r\n\r\n.input-line-height {\r\n  line-height: 31px;\r\n  font-size: 18px;\r\n  padding-right: 15px;\r\n  display: inline-block;\r\n  width: 240px;\r\n  margin: 5px;\r\n}\r\n\r\n.table-cont {\r\n  max-height: 650px;\r\n  overflow: scroll;\r\n}\r\n\r\n.modal-card-body {\r\n  text-align: center !important;\r\n}\r\n\r\n.code {\r\n  line-height: 20px;\r\n  max-width: 1100px;\r\n}\r\n\r\n.companies {\r\n  display: inline-block;\r\n}\r\n\r\n.values-cont {\r\n  display: inline-block;\r\n  margin-left: 10px;\r\n}\r\n\r\n.false {\r\n\theight: 25px;\r\n\twidth: 54px !important;\r\n    background: linear-gradient(147deg, #f71735 0%, #db3445 74%);    color: white;\r\n    padding: 0px 8px 0px 8px;\r\n    width: 49px;\r\n    border-radius: 4px;\r\n    margin-bottom: 2px;\r\n}\r\n\r\n.true {\r\n\theight: 25px;\r\n\twidth: 54px !important;\r\n    background: linear-gradient(147deg, #0BAB64 0%, #3BB78F 74%);\r\n    color: white;\r\n    padding: 0px 8px 0px 10px;\r\n    width: 49px;\r\n    border-radius: 4px;\r\n    margin-bottom: 2px;\r\n}\r\n\r\n.table td{\r\n  border: 0px !important;\r\n  border-collapse:collapse !important;\r\n}\r\n\r\n.warning-table {\r\n  width: 180px;\r\n  font-weight: 600;\r\n  font-size: 14px;\r\n  letter-spacing: 1px;\r\n  text-align: center;\r\n  background: linear-gradient(315deg, #fbb034 0%, #ffdd00 74%);\r\n  color: white !important;\r\n}\r\n\r\n.true-table {\r\n  width: 180px;\r\n  font-weight: 600;\r\n  font-size: 14px;\r\n  letter-spacing: 1px;\r\n  text-align: center;\r\n  background: linear-gradient(147deg, #0BAB64 0%, #3BB78F 74%);\r\n  color: white !important;\r\n}\r\n\r\n.false-table {\r\n  width: 180px;\r\n  font-weight: 600;\r\n  font-size: 14px;\r\n  letter-spacing: 1px;\r\n  text-align: center;\r\n  background: linear-gradient(147deg, #f71735 0%, #db3445 74%);\r\n  color: white !important;\r\n}\r\n\r\n.results {\r\n  width: 510px !important;\r\n  margin: 0 auto;\r\n}\r\n\r\n.results-cont {\r\n  overflow-x: scroll;\r\n  overflow-y: scroll;\r\n}\r\n\r\n.btn.btn-blue {\r\n  display: none;\r\n}\r\n\r\n.result div {\r\n  display: none;\r\n}\r\n\r\n.loading{\r\n  display: -webkit-inline-box !important;\r\n}\r\n\r\n.button.update-button {\r\n  margin: 7px 10px 0px 0px !important;\r\n}\r\n\r\n.customer-info {\r\n  white-space: pre-line !important;\r\n}\r\n\r\n.download-to-excel {\r\n  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);\r\n  position: absolute;\r\n  top: 315px;\r\n  border-radius: 2px;\r\n}\r\n/*-----END PAGE SPECIFIC STYLES ----- */\r\n\r\n/*-----MODE SPECIFIC STYLES ----- */\r\n\r\n.Default {\r\n  background: #0B486B;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(135deg, #F56217, #2768c7 );  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(135deg, #F56217, #2768c7 ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.TJ {\r\n  background: #b92b27;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to left, #1565C0, #b92b27);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to left, #1565C0, #b92b27); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Michael {\r\n  background: #000000;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Jess {\r\n  background: #44A08D;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #093637, #44A08D);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #093637, #44A08D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Alex {\r\n  background: -webkit-linear-gradient(to bottom, #FFFFFF, #00966E, #D62612);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to bottom, #FFFFFF, #00966E, #D62612); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Gio {\r\n  background: #5433FF;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #A5FECB, #20BDFF, #5433FF);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #A5FECB, #20BDFF, #5433FF); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Jeacoma {\r\n  background: #ee0979;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #ff6a00, #ee0979);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #ff6a00, #ee0979); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Eric {\r\n  background: #0575E6;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #021B79, #0575E6);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #021B79, #0575E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Lexanne {\r\n  background: #59C173;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #5D26C1, #a17fe0, #59C173);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #5D26C1, #a17fe0, #59C173); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n.Jana {\r\n  background: #DAE2F8;  /* fallback for old browsers */\r\n  background: -webkit-linear-gradient(to right, #D6A4A4, #DAE2F8);  /* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #D6A4A4, #DAE2F8); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n}\r\n\r\n/*-----END MODE SPECIFIC STYLES ----- */\r\n\r\n/*-----BEGIN MODAL SPECIFIC STYLES ----- */\r\n\r\n.modal-card-title {\r\n  color: white !important;\r\n}\r\n\r\n.modal-block {\r\n  margin: 10px;\r\n}\r\n\r\n.modal-button {\r\n  margin: 5px auto !important;\r\n}\r\n\r\n.modal-card {\r\n  width: 750px;\r\n}\r\n\r\n.modal-card-foot {\r\n  padding: 0px;\r\n}\r\n\r\n/*-----END MODAL SPECIFIC STYLES ----- */\r\n\r\n.clickable {\r\n  cursor: pointer !important;\r\n}\r\n\r\n.dropdown-button {\r\n  margin: 8px !important;\r\n}\r\n\r\n.tool-text {\r\n  line-height: 35px;\r\n  margin-right: 10px;\r\n  margin-left: 5px;\r\n}\r\n\r\n.num-input {\r\n  width: 100px !important;\r\n}\r\n\r\na.dropdown-item {\r\n padding-right: 0px !important;\r\n padding-left: 0px !important;\r\n text-align: center;\r\n}\r\n\r\n.message.is-danger.message-header{\r\n  width: 90% !important;\r\n}\r\n"; });
define('text!css/animate.css', ['module'], function(module) { module.exports = "@charset \"UTF-8\";\r\n\r\n/*!\r\n * animate.css -http://daneden.me/animate\r\n * Version - 3.7.0\r\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\r\n *\r\n * Copyright (c) 2018 Daniel Eden\r\n */\r\n\r\n@-webkit-keyframes bounce {\r\n  from,\r\n  20%,\r\n  53%,\r\n  80%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  40%,\r\n  43% {\r\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    -webkit-transform: translate3d(0, -30px, 0);\r\n    transform: translate3d(0, -30px, 0);\r\n  }\r\n\r\n  70% {\r\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    -webkit-transform: translate3d(0, -15px, 0);\r\n    transform: translate3d(0, -15px, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(0, -4px, 0);\r\n    transform: translate3d(0, -4px, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounce {\r\n  from,\r\n  20%,\r\n  53%,\r\n  80%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  40%,\r\n  43% {\r\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    -webkit-transform: translate3d(0, -30px, 0);\r\n    transform: translate3d(0, -30px, 0);\r\n  }\r\n\r\n  70% {\r\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\r\n    -webkit-transform: translate3d(0, -15px, 0);\r\n    transform: translate3d(0, -15px, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(0, -4px, 0);\r\n    transform: translate3d(0, -4px, 0);\r\n  }\r\n}\r\n\r\n.bounce {\r\n  -webkit-animation-name: bounce;\r\n  animation-name: bounce;\r\n  -webkit-transform-origin: center bottom;\r\n  transform-origin: center bottom;\r\n}\r\n\r\n@-webkit-keyframes flash {\r\n  from,\r\n  50%,\r\n  to {\r\n    opacity: 1;\r\n  }\r\n\r\n  25%,\r\n  75% {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes flash {\r\n  from,\r\n  50%,\r\n  to {\r\n    opacity: 1;\r\n  }\r\n\r\n  25%,\r\n  75% {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.flash {\r\n  -webkit-animation-name: flash;\r\n  animation-name: flash;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@-webkit-keyframes pulse {\r\n  from {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\r\n    transform: scale3d(1.05, 1.05, 1.05);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n@keyframes pulse {\r\n  from {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\r\n    transform: scale3d(1.05, 1.05, 1.05);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.pulse {\r\n  -webkit-animation-name: pulse;\r\n  animation-name: pulse;\r\n}\r\n\r\n@-webkit-keyframes rubberBand {\r\n  from {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: scale3d(1.25, 0.75, 1);\r\n    transform: scale3d(1.25, 0.75, 1);\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: scale3d(0.75, 1.25, 1);\r\n    transform: scale3d(0.75, 1.25, 1);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: scale3d(1.15, 0.85, 1);\r\n    transform: scale3d(1.15, 0.85, 1);\r\n  }\r\n\r\n  65% {\r\n    -webkit-transform: scale3d(0.95, 1.05, 1);\r\n    transform: scale3d(0.95, 1.05, 1);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: scale3d(1.05, 0.95, 1);\r\n    transform: scale3d(1.05, 0.95, 1);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n@keyframes rubberBand {\r\n  from {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: scale3d(1.25, 0.75, 1);\r\n    transform: scale3d(1.25, 0.75, 1);\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: scale3d(0.75, 1.25, 1);\r\n    transform: scale3d(0.75, 1.25, 1);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: scale3d(1.15, 0.85, 1);\r\n    transform: scale3d(1.15, 0.85, 1);\r\n  }\r\n\r\n  65% {\r\n    -webkit-transform: scale3d(0.95, 1.05, 1);\r\n    transform: scale3d(0.95, 1.05, 1);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: scale3d(1.05, 0.95, 1);\r\n    transform: scale3d(1.05, 0.95, 1);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.rubberBand {\r\n  -webkit-animation-name: rubberBand;\r\n  animation-name: rubberBand;\r\n}\r\n\r\n@-webkit-keyframes shake {\r\n  from,\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  10%,\r\n  30%,\r\n  50%,\r\n  70%,\r\n  90% {\r\n    -webkit-transform: translate3d(-10px, 0, 0);\r\n    transform: translate3d(-10px, 0, 0);\r\n  }\r\n\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80% {\r\n    -webkit-transform: translate3d(10px, 0, 0);\r\n    transform: translate3d(10px, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes shake {\r\n  from,\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  10%,\r\n  30%,\r\n  50%,\r\n  70%,\r\n  90% {\r\n    -webkit-transform: translate3d(-10px, 0, 0);\r\n    transform: translate3d(-10px, 0, 0);\r\n  }\r\n\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80% {\r\n    -webkit-transform: translate3d(10px, 0, 0);\r\n    transform: translate3d(10px, 0, 0);\r\n  }\r\n}\r\n\r\n.shake {\r\n  -webkit-animation-name: shake;\r\n  animation-name: shake;\r\n}\r\n\r\n@-webkit-keyframes headShake {\r\n  0% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n\r\n  6.5% {\r\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\r\n    transform: translateX(-6px) rotateY(-9deg);\r\n  }\r\n\r\n  18.5% {\r\n    -webkit-transform: translateX(5px) rotateY(7deg);\r\n    transform: translateX(5px) rotateY(7deg);\r\n  }\r\n\r\n  31.5% {\r\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\r\n    transform: translateX(-3px) rotateY(-5deg);\r\n  }\r\n\r\n  43.5% {\r\n    -webkit-transform: translateX(2px) rotateY(3deg);\r\n    transform: translateX(2px) rotateY(3deg);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n}\r\n\r\n@keyframes headShake {\r\n  0% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n\r\n  6.5% {\r\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\r\n    transform: translateX(-6px) rotateY(-9deg);\r\n  }\r\n\r\n  18.5% {\r\n    -webkit-transform: translateX(5px) rotateY(7deg);\r\n    transform: translateX(5px) rotateY(7deg);\r\n  }\r\n\r\n  31.5% {\r\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\r\n    transform: translateX(-3px) rotateY(-5deg);\r\n  }\r\n\r\n  43.5% {\r\n    -webkit-transform: translateX(2px) rotateY(3deg);\r\n    transform: translateX(2px) rotateY(3deg);\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: translateX(0);\r\n    transform: translateX(0);\r\n  }\r\n}\r\n\r\n.headShake {\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n  -webkit-animation-name: headShake;\r\n  animation-name: headShake;\r\n}\r\n\r\n@-webkit-keyframes swing {\r\n  20% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\r\n    transform: rotate3d(0, 0, 1, 15deg);\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\r\n    transform: rotate3d(0, 0, 1, -10deg);\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\r\n    transform: rotate3d(0, 0, 1, 5deg);\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\r\n    transform: rotate3d(0, 0, 1, -5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n    transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n}\r\n\r\n@keyframes swing {\r\n  20% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\r\n    transform: rotate3d(0, 0, 1, 15deg);\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\r\n    transform: rotate3d(0, 0, 1, -10deg);\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\r\n    transform: rotate3d(0, 0, 1, 5deg);\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\r\n    transform: rotate3d(0, 0, 1, -5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\r\n    transform: rotate3d(0, 0, 1, 0deg);\r\n  }\r\n}\r\n\r\n.swing {\r\n  -webkit-transform-origin: top center;\r\n  transform-origin: top center;\r\n  -webkit-animation-name: swing;\r\n  animation-name: swing;\r\n}\r\n\r\n@-webkit-keyframes tada {\r\n  from {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  10%,\r\n  20% {\r\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\r\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  30%,\r\n  50%,\r\n  70%,\r\n  90% {\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\r\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\r\n  }\r\n\r\n  40%,\r\n  60%,\r\n  80% {\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\r\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n@keyframes tada {\r\n  from {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n\r\n  10%,\r\n  20% {\r\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\r\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  30%,\r\n  50%,\r\n  70%,\r\n  90% {\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\r\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\r\n  }\r\n\r\n  40%,\r\n  60%,\r\n  80% {\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\r\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.tada {\r\n  -webkit-animation-name: tada;\r\n  animation-name: tada;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@-webkit-keyframes wobble {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  15% {\r\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\r\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\r\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\r\n  }\r\n\r\n  45% {\r\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\r\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\r\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\r\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes wobble {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  15% {\r\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\r\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\r\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\r\n  }\r\n\r\n  45% {\r\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\r\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\r\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\r\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.wobble {\r\n  -webkit-animation-name: wobble;\r\n  animation-name: wobble;\r\n}\r\n\r\n@-webkit-keyframes jello {\r\n  from,\r\n  11.1%,\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  22.2% {\r\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\r\n    transform: skewX(-12.5deg) skewY(-12.5deg);\r\n  }\r\n\r\n  33.3% {\r\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\r\n    transform: skewX(6.25deg) skewY(6.25deg);\r\n  }\r\n\r\n  44.4% {\r\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\r\n    transform: skewX(-3.125deg) skewY(-3.125deg);\r\n  }\r\n\r\n  55.5% {\r\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\r\n    transform: skewX(1.5625deg) skewY(1.5625deg);\r\n  }\r\n\r\n  66.6% {\r\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\r\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\r\n  }\r\n\r\n  77.7% {\r\n    -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);\r\n    transform: skewX(0.390625deg) skewY(0.390625deg);\r\n  }\r\n\r\n  88.8% {\r\n    -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\r\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\r\n  }\r\n}\r\n\r\n@keyframes jello {\r\n  from,\r\n  11.1%,\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  22.2% {\r\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\r\n    transform: skewX(-12.5deg) skewY(-12.5deg);\r\n  }\r\n\r\n  33.3% {\r\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\r\n    transform: skewX(6.25deg) skewY(6.25deg);\r\n  }\r\n\r\n  44.4% {\r\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\r\n    transform: skewX(-3.125deg) skewY(-3.125deg);\r\n  }\r\n\r\n  55.5% {\r\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\r\n    transform: skewX(1.5625deg) skewY(1.5625deg);\r\n  }\r\n\r\n  66.6% {\r\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\r\n    transform: skewX(-0.78125deg) skewY(-0.78125deg);\r\n  }\r\n\r\n  77.7% {\r\n    -webkit-transform: skewX(0.390625deg) skewY(0.390625deg);\r\n    transform: skewX(0.390625deg) skewY(0.390625deg);\r\n  }\r\n\r\n  88.8% {\r\n    -webkit-transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\r\n    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);\r\n  }\r\n}\r\n\r\n.jello {\r\n  -webkit-animation-name: jello;\r\n  animation-name: jello;\r\n  -webkit-transform-origin: center;\r\n  transform-origin: center;\r\n}\r\n\r\n@-webkit-keyframes heartBeat {\r\n  0% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n\r\n  14% {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n\r\n  28% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n\r\n  42% {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n\r\n  70% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n@keyframes heartBeat {\r\n  0% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n\r\n  14% {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n\r\n  28% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n\r\n  42% {\r\n    -webkit-transform: scale(1.3);\r\n    transform: scale(1.3);\r\n  }\r\n\r\n  70% {\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n.heartBeat {\r\n  -webkit-animation-name: heartBeat;\r\n  animation-name: heartBeat;\r\n  -webkit-animation-duration: 1.3s;\r\n  animation-duration: 1.3s;\r\n  -webkit-animation-timing-function: ease-in-out;\r\n  animation-timing-function: ease-in-out;\r\n}\r\n\r\n@-webkit-keyframes bounceIn {\r\n  from,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  20% {\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\r\n    transform: scale3d(1.1, 1.1, 1.1);\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\r\n    transform: scale3d(0.9, 0.9, 0.9);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\r\n    transform: scale3d(1.03, 1.03, 1.03);\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\r\n    transform: scale3d(0.97, 0.97, 0.97);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n@keyframes bounceIn {\r\n  from,\r\n  20%,\r\n  40%,\r\n  60%,\r\n  80%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  20% {\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\r\n    transform: scale3d(1.1, 1.1, 1.1);\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\r\n    transform: scale3d(0.9, 0.9, 0.9);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\r\n    transform: scale3d(1.03, 1.03, 1.03);\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\r\n    transform: scale3d(0.97, 0.97, 0.97);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(1, 1, 1);\r\n    transform: scale3d(1, 1, 1);\r\n  }\r\n}\r\n\r\n.bounceIn {\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-name: bounceIn;\r\n  animation-name: bounceIn;\r\n}\r\n\r\n@-webkit-keyframes bounceInDown {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -3000px, 0);\r\n    transform: translate3d(0, -3000px, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 25px, 0);\r\n    transform: translate3d(0, 25px, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(0, -10px, 0);\r\n    transform: translate3d(0, -10px, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(0, 5px, 0);\r\n    transform: translate3d(0, 5px, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceInDown {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -3000px, 0);\r\n    transform: translate3d(0, -3000px, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 25px, 0);\r\n    transform: translate3d(0, 25px, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(0, -10px, 0);\r\n    transform: translate3d(0, -10px, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(0, 5px, 0);\r\n    transform: translate3d(0, 5px, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceInDown {\r\n  -webkit-animation-name: bounceInDown;\r\n  animation-name: bounceInDown;\r\n}\r\n\r\n@-webkit-keyframes bounceInLeft {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-3000px, 0, 0);\r\n    transform: translate3d(-3000px, 0, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(25px, 0, 0);\r\n    transform: translate3d(25px, 0, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(-10px, 0, 0);\r\n    transform: translate3d(-10px, 0, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(5px, 0, 0);\r\n    transform: translate3d(5px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceInLeft {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  0% {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-3000px, 0, 0);\r\n    transform: translate3d(-3000px, 0, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(25px, 0, 0);\r\n    transform: translate3d(25px, 0, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(-10px, 0, 0);\r\n    transform: translate3d(-10px, 0, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(5px, 0, 0);\r\n    transform: translate3d(5px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceInLeft {\r\n  -webkit-animation-name: bounceInLeft;\r\n  animation-name: bounceInLeft;\r\n}\r\n\r\n@-webkit-keyframes bounceInRight {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(3000px, 0, 0);\r\n    transform: translate3d(3000px, 0, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(-25px, 0, 0);\r\n    transform: translate3d(-25px, 0, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(10px, 0, 0);\r\n    transform: translate3d(10px, 0, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(-5px, 0, 0);\r\n    transform: translate3d(-5px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceInRight {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(3000px, 0, 0);\r\n    transform: translate3d(3000px, 0, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(-25px, 0, 0);\r\n    transform: translate3d(-25px, 0, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(10px, 0, 0);\r\n    transform: translate3d(10px, 0, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(-5px, 0, 0);\r\n    transform: translate3d(-5px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceInRight {\r\n  -webkit-animation-name: bounceInRight;\r\n  animation-name: bounceInRight;\r\n}\r\n\r\n@-webkit-keyframes bounceInUp {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 3000px, 0);\r\n    transform: translate3d(0, 3000px, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, -20px, 0);\r\n    transform: translate3d(0, -20px, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(0, 10px, 0);\r\n    transform: translate3d(0, 10px, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(0, -5px, 0);\r\n    transform: translate3d(0, -5px, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceInUp {\r\n  from,\r\n  60%,\r\n  75%,\r\n  90%,\r\n  to {\r\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\r\n  }\r\n\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 3000px, 0);\r\n    transform: translate3d(0, 3000px, 0);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, -20px, 0);\r\n    transform: translate3d(0, -20px, 0);\r\n  }\r\n\r\n  75% {\r\n    -webkit-transform: translate3d(0, 10px, 0);\r\n    transform: translate3d(0, 10px, 0);\r\n  }\r\n\r\n  90% {\r\n    -webkit-transform: translate3d(0, -5px, 0);\r\n    transform: translate3d(0, -5px, 0);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceInUp {\r\n  -webkit-animation-name: bounceInUp;\r\n  animation-name: bounceInUp;\r\n}\r\n\r\n@-webkit-keyframes bounceOut {\r\n  20% {\r\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\r\n    transform: scale3d(0.9, 0.9, 0.9);\r\n  }\r\n\r\n  50%,\r\n  55% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\r\n    transform: scale3d(1.1, 1.1, 1.1);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n}\r\n\r\n@keyframes bounceOut {\r\n  20% {\r\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\r\n    transform: scale3d(0.9, 0.9, 0.9);\r\n  }\r\n\r\n  50%,\r\n  55% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\r\n    transform: scale3d(1.1, 1.1, 1.1);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n}\r\n\r\n.bounceOut {\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-name: bounceOut;\r\n  animation-name: bounceOut;\r\n}\r\n\r\n@-webkit-keyframes bounceOutDown {\r\n  20% {\r\n    -webkit-transform: translate3d(0, 10px, 0);\r\n    transform: translate3d(0, 10px, 0);\r\n  }\r\n\r\n  40%,\r\n  45% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, -20px, 0);\r\n    transform: translate3d(0, -20px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 2000px, 0);\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceOutDown {\r\n  20% {\r\n    -webkit-transform: translate3d(0, 10px, 0);\r\n    transform: translate3d(0, 10px, 0);\r\n  }\r\n\r\n  40%,\r\n  45% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, -20px, 0);\r\n    transform: translate3d(0, -20px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 2000px, 0);\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n}\r\n\r\n.bounceOutDown {\r\n  -webkit-animation-name: bounceOutDown;\r\n  animation-name: bounceOutDown;\r\n}\r\n\r\n@-webkit-keyframes bounceOutLeft {\r\n  20% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(20px, 0, 0);\r\n    transform: translate3d(20px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-2000px, 0, 0);\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceOutLeft {\r\n  20% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(20px, 0, 0);\r\n    transform: translate3d(20px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-2000px, 0, 0);\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceOutLeft {\r\n  -webkit-animation-name: bounceOutLeft;\r\n  animation-name: bounceOutLeft;\r\n}\r\n\r\n@-webkit-keyframes bounceOutRight {\r\n  20% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(-20px, 0, 0);\r\n    transform: translate3d(-20px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(2000px, 0, 0);\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceOutRight {\r\n  20% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(-20px, 0, 0);\r\n    transform: translate3d(-20px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(2000px, 0, 0);\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.bounceOutRight {\r\n  -webkit-animation-name: bounceOutRight;\r\n  animation-name: bounceOutRight;\r\n}\r\n\r\n@-webkit-keyframes bounceOutUp {\r\n  20% {\r\n    -webkit-transform: translate3d(0, -10px, 0);\r\n    transform: translate3d(0, -10px, 0);\r\n  }\r\n\r\n  40%,\r\n  45% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 20px, 0);\r\n    transform: translate3d(0, 20px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -2000px, 0);\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n}\r\n\r\n@keyframes bounceOutUp {\r\n  20% {\r\n    -webkit-transform: translate3d(0, -10px, 0);\r\n    transform: translate3d(0, -10px, 0);\r\n  }\r\n\r\n  40%,\r\n  45% {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 20px, 0);\r\n    transform: translate3d(0, 20px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -2000px, 0);\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n}\r\n\r\n.bounceOutUp {\r\n  -webkit-animation-name: bounceOutUp;\r\n  animation-name: bounceOutUp;\r\n}\r\n\r\n@-webkit-keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes fadeIn {\r\n  from {\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.fadeIn {\r\n  -webkit-animation-name: fadeIn;\r\n  animation-name: fadeIn;\r\n}\r\n\r\n@-webkit-keyframes fadeInDown {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInDown {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInDown {\r\n  -webkit-animation-name: fadeInDown;\r\n  animation-name: fadeInDown;\r\n}\r\n\r\n@-webkit-keyframes fadeInDownBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -2000px, 0);\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInDownBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -2000px, 0);\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInDownBig {\r\n  -webkit-animation-name: fadeInDownBig;\r\n  animation-name: fadeInDownBig;\r\n}\r\n\r\n@-webkit-keyframes fadeInLeft {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInLeft {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInLeft {\r\n  -webkit-animation-name: fadeInLeft;\r\n  animation-name: fadeInLeft;\r\n}\r\n\r\n@-webkit-keyframes fadeInLeftBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-2000px, 0, 0);\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInLeftBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-2000px, 0, 0);\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInLeftBig {\r\n  -webkit-animation-name: fadeInLeftBig;\r\n  animation-name: fadeInLeftBig;\r\n}\r\n\r\n@-webkit-keyframes fadeInRight {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInRight {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInRight {\r\n  -webkit-animation-name: fadeInRight;\r\n  animation-name: fadeInRight;\r\n}\r\n\r\n@-webkit-keyframes fadeInRightBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(2000px, 0, 0);\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInRightBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(2000px, 0, 0);\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInRightBig {\r\n  -webkit-animation-name: fadeInRightBig;\r\n  animation-name: fadeInRightBig;\r\n}\r\n\r\n@-webkit-keyframes fadeInUp {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInUp {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInUp {\r\n  -webkit-animation-name: fadeInUp;\r\n  animation-name: fadeInUp;\r\n}\r\n\r\n@-webkit-keyframes fadeInUpBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 2000px, 0);\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeInUpBig {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 2000px, 0);\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeInUpBig {\r\n  -webkit-animation-name: fadeInUpBig;\r\n  animation-name: fadeInUpBig;\r\n}\r\n\r\n@-webkit-keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes fadeOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.fadeOut {\r\n  -webkit-animation-name: fadeOut;\r\n  animation-name: fadeOut;\r\n}\r\n\r\n@-webkit-keyframes fadeOutDown {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutDown {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n\r\n.fadeOutDown {\r\n  -webkit-animation-name: fadeOutDown;\r\n  animation-name: fadeOutDown;\r\n}\r\n\r\n@-webkit-keyframes fadeOutDownBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 2000px, 0);\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutDownBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, 2000px, 0);\r\n    transform: translate3d(0, 2000px, 0);\r\n  }\r\n}\r\n\r\n.fadeOutDownBig {\r\n  -webkit-animation-name: fadeOutDownBig;\r\n  animation-name: fadeOutDownBig;\r\n}\r\n\r\n@-webkit-keyframes fadeOutLeft {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutLeft {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutLeft {\r\n  -webkit-animation-name: fadeOutLeft;\r\n  animation-name: fadeOutLeft;\r\n}\r\n\r\n@-webkit-keyframes fadeOutLeftBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-2000px, 0, 0);\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutLeftBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-2000px, 0, 0);\r\n    transform: translate3d(-2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutLeftBig {\r\n  -webkit-animation-name: fadeOutLeftBig;\r\n  animation-name: fadeOutLeftBig;\r\n}\r\n\r\n@-webkit-keyframes fadeOutRight {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutRight {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutRight {\r\n  -webkit-animation-name: fadeOutRight;\r\n  animation-name: fadeOutRight;\r\n}\r\n\r\n@-webkit-keyframes fadeOutRightBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(2000px, 0, 0);\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutRightBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(2000px, 0, 0);\r\n    transform: translate3d(2000px, 0, 0);\r\n  }\r\n}\r\n\r\n.fadeOutRightBig {\r\n  -webkit-animation-name: fadeOutRightBig;\r\n  animation-name: fadeOutRightBig;\r\n}\r\n\r\n@-webkit-keyframes fadeOutUp {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutUp {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n}\r\n\r\n.fadeOutUp {\r\n  -webkit-animation-name: fadeOutUp;\r\n  animation-name: fadeOutUp;\r\n}\r\n\r\n@-webkit-keyframes fadeOutUpBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -2000px, 0);\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n}\r\n\r\n@keyframes fadeOutUpBig {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(0, -2000px, 0);\r\n    transform: translate3d(0, -2000px, 0);\r\n  }\r\n}\r\n\r\n.fadeOutUpBig {\r\n  -webkit-animation-name: fadeOutUpBig;\r\n  animation-name: fadeOutUpBig;\r\n}\r\n\r\n@-webkit-keyframes flip {\r\n  from {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, -360deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\r\n    -webkit-animation-timing-function: ease-out;\r\n    animation-timing-function: ease-out;\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -190deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -190deg);\r\n    -webkit-animation-timing-function: ease-out;\r\n    animation-timing-function: ease-out;\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -170deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -170deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, 0deg);\r\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, 0deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, 0deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n}\r\n\r\n@keyframes flip {\r\n  from {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, -360deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, -360deg);\r\n    -webkit-animation-timing-function: ease-out;\r\n    animation-timing-function: ease-out;\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -190deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -190deg);\r\n    -webkit-animation-timing-function: ease-out;\r\n    animation-timing-function: ease-out;\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -170deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 150px)\r\n      rotate3d(0, 1, 0, -170deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, 0deg);\r\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, 0deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0)\r\n      rotate3d(0, 1, 0, 0deg);\r\n    transform: perspective(400px) scale3d(1, 1, 1) translate3d(0, 0, 0) rotate3d(0, 1, 0, 0deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n}\r\n\r\n.animated.flip {\r\n  -webkit-backface-visibility: visible;\r\n  backface-visibility: visible;\r\n  -webkit-animation-name: flip;\r\n  animation-name: flip;\r\n}\r\n\r\n@-webkit-keyframes flipInX {\r\n  from {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n    opacity: 0;\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n}\r\n\r\n@keyframes flipInX {\r\n  from {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n    opacity: 0;\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n}\r\n\r\n.flipInX {\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n  -webkit-animation-name: flipInX;\r\n  animation-name: flipInX;\r\n}\r\n\r\n@-webkit-keyframes flipInY {\r\n  from {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n    opacity: 0;\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n}\r\n\r\n@keyframes flipInY {\r\n  from {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n    opacity: 0;\r\n  }\r\n\r\n  40% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\r\n    -webkit-animation-timing-function: ease-in;\r\n    animation-timing-function: ease-in;\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n}\r\n\r\n.flipInY {\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n  -webkit-animation-name: flipInY;\r\n  animation-name: flipInY;\r\n}\r\n\r\n@-webkit-keyframes flipOutX {\r\n  from {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes flipOutX {\r\n  from {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.flipOutX {\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-animation-name: flipOutX;\r\n  animation-name: flipOutX;\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n}\r\n\r\n@-webkit-keyframes flipOutY {\r\n  from {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes flipOutY {\r\n  from {\r\n    -webkit-transform: perspective(400px);\r\n    transform: perspective(400px);\r\n  }\r\n\r\n  30% {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.flipOutY {\r\n  -webkit-animation-duration: 0.75s;\r\n  animation-duration: 0.75s;\r\n  -webkit-backface-visibility: visible !important;\r\n  backface-visibility: visible !important;\r\n  -webkit-animation-name: flipOutY;\r\n  animation-name: flipOutY;\r\n}\r\n\r\n@-webkit-keyframes lightSpeedIn {\r\n  from {\r\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\r\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: skewX(20deg);\r\n    transform: skewX(20deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: skewX(-5deg);\r\n    transform: skewX(-5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes lightSpeedIn {\r\n  from {\r\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\r\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  60% {\r\n    -webkit-transform: skewX(20deg);\r\n    transform: skewX(20deg);\r\n    opacity: 1;\r\n  }\r\n\r\n  80% {\r\n    -webkit-transform: skewX(-5deg);\r\n    transform: skewX(-5deg);\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.lightSpeedIn {\r\n  -webkit-animation-name: lightSpeedIn;\r\n  animation-name: lightSpeedIn;\r\n  -webkit-animation-timing-function: ease-out;\r\n  animation-timing-function: ease-out;\r\n}\r\n\r\n@-webkit-keyframes lightSpeedOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\r\n    transform: translate3d(100%, 0, 0) skewX(30deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes lightSpeedOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\r\n    transform: translate3d(100%, 0, 0) skewX(30deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.lightSpeedOut {\r\n  -webkit-animation-name: lightSpeedOut;\r\n  animation-name: lightSpeedOut;\r\n  -webkit-animation-timing-function: ease-in;\r\n  animation-timing-function: ease-in;\r\n}\r\n\r\n@-webkit-keyframes rotateIn {\r\n  from {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\r\n    transform: rotate3d(0, 0, 1, -200deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes rotateIn {\r\n  from {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\r\n    transform: rotate3d(0, 0, 1, -200deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateIn {\r\n  -webkit-animation-name: rotateIn;\r\n  animation-name: rotateIn;\r\n}\r\n\r\n@-webkit-keyframes rotateInDownLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes rotateInDownLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInDownLeft {\r\n  -webkit-animation-name: rotateInDownLeft;\r\n  animation-name: rotateInDownLeft;\r\n}\r\n\r\n@-webkit-keyframes rotateInDownRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes rotateInDownRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInDownRight {\r\n  -webkit-animation-name: rotateInDownRight;\r\n  animation-name: rotateInDownRight;\r\n}\r\n\r\n@-webkit-keyframes rotateInUpLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes rotateInUpLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInUpLeft {\r\n  -webkit-animation-name: rotateInUpLeft;\r\n  animation-name: rotateInUpLeft;\r\n}\r\n\r\n@-webkit-keyframes rotateInUpRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\r\n    transform: rotate3d(0, 0, 1, -90deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes rotateInUpRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\r\n    transform: rotate3d(0, 0, 1, -90deg);\r\n    opacity: 0;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.rotateInUpRight {\r\n  -webkit-animation-name: rotateInUpRight;\r\n  animation-name: rotateInUpRight;\r\n}\r\n\r\n@-webkit-keyframes rotateOut {\r\n  from {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\r\n    transform: rotate3d(0, 0, 1, 200deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes rotateOut {\r\n  from {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: center;\r\n    transform-origin: center;\r\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\r\n    transform: rotate3d(0, 0, 1, 200deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOut {\r\n  -webkit-animation-name: rotateOut;\r\n  animation-name: rotateOut;\r\n}\r\n\r\n@-webkit-keyframes rotateOutDownLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes rotateOutDownLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\r\n    transform: rotate3d(0, 0, 1, 45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutDownLeft {\r\n  -webkit-animation-name: rotateOutDownLeft;\r\n  animation-name: rotateOutDownLeft;\r\n}\r\n\r\n@-webkit-keyframes rotateOutDownRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes rotateOutDownRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutDownRight {\r\n  -webkit-animation-name: rotateOutDownRight;\r\n  animation-name: rotateOutDownRight;\r\n}\r\n\r\n@-webkit-keyframes rotateOutUpLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes rotateOutUpLeft {\r\n  from {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: left bottom;\r\n    transform-origin: left bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\r\n    transform: rotate3d(0, 0, 1, -45deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutUpLeft {\r\n  -webkit-animation-name: rotateOutUpLeft;\r\n  animation-name: rotateOutUpLeft;\r\n}\r\n\r\n@-webkit-keyframes rotateOutUpRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\r\n    transform: rotate3d(0, 0, 1, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes rotateOutUpRight {\r\n  from {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform-origin: right bottom;\r\n    transform-origin: right bottom;\r\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\r\n    transform: rotate3d(0, 0, 1, 90deg);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.rotateOutUpRight {\r\n  -webkit-animation-name: rotateOutUpRight;\r\n  animation-name: rotateOutUpRight;\r\n}\r\n\r\n@-webkit-keyframes hinge {\r\n  0% {\r\n    -webkit-transform-origin: top left;\r\n    transform-origin: top left;\r\n    -webkit-animation-timing-function: ease-in-out;\r\n    animation-timing-function: ease-in-out;\r\n  }\r\n\r\n  20%,\r\n  60% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\r\n    transform: rotate3d(0, 0, 1, 80deg);\r\n    -webkit-transform-origin: top left;\r\n    transform-origin: top left;\r\n    -webkit-animation-timing-function: ease-in-out;\r\n    animation-timing-function: ease-in-out;\r\n  }\r\n\r\n  40%,\r\n  80% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\r\n    transform: rotate3d(0, 0, 1, 60deg);\r\n    -webkit-transform-origin: top left;\r\n    transform-origin: top left;\r\n    -webkit-animation-timing-function: ease-in-out;\r\n    animation-timing-function: ease-in-out;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 700px, 0);\r\n    transform: translate3d(0, 700px, 0);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes hinge {\r\n  0% {\r\n    -webkit-transform-origin: top left;\r\n    transform-origin: top left;\r\n    -webkit-animation-timing-function: ease-in-out;\r\n    animation-timing-function: ease-in-out;\r\n  }\r\n\r\n  20%,\r\n  60% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\r\n    transform: rotate3d(0, 0, 1, 80deg);\r\n    -webkit-transform-origin: top left;\r\n    transform-origin: top left;\r\n    -webkit-animation-timing-function: ease-in-out;\r\n    animation-timing-function: ease-in-out;\r\n  }\r\n\r\n  40%,\r\n  80% {\r\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\r\n    transform: rotate3d(0, 0, 1, 60deg);\r\n    -webkit-transform-origin: top left;\r\n    transform-origin: top left;\r\n    -webkit-animation-timing-function: ease-in-out;\r\n    animation-timing-function: ease-in-out;\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 700px, 0);\r\n    transform: translate3d(0, 700px, 0);\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.hinge {\r\n  -webkit-animation-duration: 2s;\r\n  animation-duration: 2s;\r\n  -webkit-animation-name: hinge;\r\n  animation-name: hinge;\r\n}\r\n\r\n@-webkit-keyframes jackInTheBox {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.1) rotate(30deg);\r\n    transform: scale(0.1) rotate(30deg);\r\n    -webkit-transform-origin: center bottom;\r\n    transform-origin: center bottom;\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: rotate(-10deg);\r\n    transform: rotate(-10deg);\r\n  }\r\n\r\n  70% {\r\n    -webkit-transform: rotate(3deg);\r\n    transform: rotate(3deg);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n@keyframes jackInTheBox {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.1) rotate(30deg);\r\n    transform: scale(0.1) rotate(30deg);\r\n    -webkit-transform-origin: center bottom;\r\n    transform-origin: center bottom;\r\n  }\r\n\r\n  50% {\r\n    -webkit-transform: rotate(-10deg);\r\n    transform: rotate(-10deg);\r\n  }\r\n\r\n  70% {\r\n    -webkit-transform: rotate(3deg);\r\n    transform: rotate(3deg);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: scale(1);\r\n    transform: scale(1);\r\n  }\r\n}\r\n\r\n.jackInTheBox {\r\n  -webkit-animation-name: jackInTheBox;\r\n  animation-name: jackInTheBox;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@-webkit-keyframes rollIn {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\r\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes rollIn {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\r\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\r\n  }\r\n\r\n  to {\r\n    opacity: 1;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.rollIn {\r\n  -webkit-animation-name: rollIn;\r\n  animation-name: rollIn;\r\n}\r\n\r\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\r\n\r\n@-webkit-keyframes rollOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\r\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\r\n  }\r\n}\r\n\r\n@keyframes rollOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\r\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\r\n  }\r\n}\r\n\r\n.rollOut {\r\n  -webkit-animation-name: rollOut;\r\n  animation-name: rollOut;\r\n}\r\n\r\n@-webkit-keyframes zoomIn {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes zoomIn {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  50% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n.zoomIn {\r\n  -webkit-animation-name: zoomIn;\r\n  animation-name: zoomIn;\r\n}\r\n\r\n@-webkit-keyframes zoomInDown {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n@keyframes zoomInDown {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInDown {\r\n  -webkit-animation-name: zoomInDown;\r\n  animation-name: zoomInDown;\r\n}\r\n\r\n@-webkit-keyframes zoomInLeft {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n@keyframes zoomInLeft {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInLeft {\r\n  -webkit-animation-name: zoomInLeft;\r\n  animation-name: zoomInLeft;\r\n}\r\n\r\n@-webkit-keyframes zoomInRight {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n@keyframes zoomInRight {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInRight {\r\n  -webkit-animation-name: zoomInRight;\r\n  animation-name: zoomInRight;\r\n}\r\n\r\n@-webkit-keyframes zoomInUp {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n@keyframes zoomInUp {\r\n  from {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  60% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomInUp {\r\n  -webkit-animation-name: zoomInUp;\r\n  animation-name: zoomInUp;\r\n}\r\n\r\n@-webkit-keyframes zoomOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  50% {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n@keyframes zoomOut {\r\n  from {\r\n    opacity: 1;\r\n  }\r\n\r\n  50% {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\r\n    transform: scale3d(0.3, 0.3, 0.3);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n  }\r\n}\r\n\r\n.zoomOut {\r\n  -webkit-animation-name: zoomOut;\r\n  animation-name: zoomOut;\r\n}\r\n\r\n@-webkit-keyframes zoomOutDown {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\r\n    -webkit-transform-origin: center bottom;\r\n    transform-origin: center bottom;\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n@keyframes zoomOutDown {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\r\n    -webkit-transform-origin: center bottom;\r\n    transform-origin: center bottom;\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomOutDown {\r\n  -webkit-animation-name: zoomOutDown;\r\n  animation-name: zoomOutDown;\r\n}\r\n\r\n@-webkit-keyframes zoomOutLeft {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\r\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\r\n    -webkit-transform-origin: left center;\r\n    transform-origin: left center;\r\n  }\r\n}\r\n\r\n@keyframes zoomOutLeft {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\r\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\r\n    -webkit-transform-origin: left center;\r\n    transform-origin: left center;\r\n  }\r\n}\r\n\r\n.zoomOutLeft {\r\n  -webkit-animation-name: zoomOutLeft;\r\n  animation-name: zoomOutLeft;\r\n}\r\n\r\n@-webkit-keyframes zoomOutRight {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\r\n    transform: scale(0.1) translate3d(2000px, 0, 0);\r\n    -webkit-transform-origin: right center;\r\n    transform-origin: right center;\r\n  }\r\n}\r\n\r\n@keyframes zoomOutRight {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\r\n    transform: scale(0.1) translate3d(2000px, 0, 0);\r\n    -webkit-transform-origin: right center;\r\n    transform-origin: right center;\r\n  }\r\n}\r\n\r\n.zoomOutRight {\r\n  -webkit-animation-name: zoomOutRight;\r\n  animation-name: zoomOutRight;\r\n}\r\n\r\n@-webkit-keyframes zoomOutUp {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\r\n    -webkit-transform-origin: center bottom;\r\n    transform-origin: center bottom;\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n@keyframes zoomOutUp {\r\n  40% {\r\n    opacity: 1;\r\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\r\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\r\n  }\r\n\r\n  to {\r\n    opacity: 0;\r\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\r\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\r\n    -webkit-transform-origin: center bottom;\r\n    transform-origin: center bottom;\r\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\r\n  }\r\n}\r\n\r\n.zoomOutUp {\r\n  -webkit-animation-name: zoomOutUp;\r\n  animation-name: zoomOutUp;\r\n}\r\n\r\n@-webkit-keyframes slideInDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideInDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInDown {\r\n  -webkit-animation-name: slideInDown;\r\n  animation-name: slideInDown;\r\n}\r\n\r\n@-webkit-keyframes slideInLeft {\r\n  from {\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideInLeft {\r\n  from {\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInLeft {\r\n  -webkit-animation-name: slideInLeft;\r\n  animation-name: slideInLeft;\r\n}\r\n\r\n@-webkit-keyframes slideInRight {\r\n  from {\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideInRight {\r\n  from {\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInRight {\r\n  -webkit-animation-name: slideInRight;\r\n  animation-name: slideInRight;\r\n}\r\n\r\n@-webkit-keyframes slideInUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideInUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n    visibility: visible;\r\n  }\r\n\r\n  to {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n}\r\n\r\n.slideInUp {\r\n  -webkit-animation-name: slideInUp;\r\n  animation-name: slideInUp;\r\n}\r\n\r\n@-webkit-keyframes slideOutDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideOutDown {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(0, 100%, 0);\r\n    transform: translate3d(0, 100%, 0);\r\n  }\r\n}\r\n\r\n.slideOutDown {\r\n  -webkit-animation-name: slideOutDown;\r\n  animation-name: slideOutDown;\r\n}\r\n\r\n@-webkit-keyframes slideOutLeft {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideOutLeft {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(-100%, 0, 0);\r\n    transform: translate3d(-100%, 0, 0);\r\n  }\r\n}\r\n\r\n.slideOutLeft {\r\n  -webkit-animation-name: slideOutLeft;\r\n  animation-name: slideOutLeft;\r\n}\r\n\r\n@-webkit-keyframes slideOutRight {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideOutRight {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(100%, 0, 0);\r\n    transform: translate3d(100%, 0, 0);\r\n  }\r\n}\r\n\r\n.slideOutRight {\r\n  -webkit-animation-name: slideOutRight;\r\n  animation-name: slideOutRight;\r\n}\r\n\r\n@-webkit-keyframes slideOutUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n}\r\n\r\n@keyframes slideOutUp {\r\n  from {\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0);\r\n  }\r\n\r\n  to {\r\n    visibility: hidden;\r\n    -webkit-transform: translate3d(0, -100%, 0);\r\n    transform: translate3d(0, -100%, 0);\r\n  }\r\n}\r\n\r\n.slideOutUp {\r\n  -webkit-animation-name: slideOutUp;\r\n  animation-name: slideOutUp;\r\n}\r\n\r\n.animated {\r\n  -webkit-animation-duration: 1s;\r\n  animation-duration: 1s;\r\n  -webkit-animation-fill-mode: both;\r\n  animation-fill-mode: both;\r\n}\r\n\r\n.animated.infinite {\r\n  -webkit-animation-iteration-count: infinite;\r\n  animation-iteration-count: infinite;\r\n}\r\n\r\n.animated.delay-1s {\r\n  -webkit-animation-delay: 1s;\r\n  animation-delay: 1s;\r\n}\r\n\r\n.animated.delay-2s {\r\n  -webkit-animation-delay: 2s;\r\n  animation-delay: 2s;\r\n}\r\n\r\n.animated.delay-3s {\r\n  -webkit-animation-delay: 3s;\r\n  animation-delay: 3s;\r\n}\r\n\r\n.animated.delay-4s {\r\n  -webkit-animation-delay: 4s;\r\n  animation-delay: 4s;\r\n}\r\n\r\n.animated.delay-5s {\r\n  -webkit-animation-delay: 5s;\r\n  animation-delay: 5s;\r\n}\r\n\r\n.animated.fast {\r\n  -webkit-animation-duration: 800ms;\r\n  animation-duration: 800ms;\r\n}\r\n\r\n.animated.faster {\r\n  -webkit-animation-duration: 500ms;\r\n  animation-duration: 500ms;\r\n}\r\n\r\n.animated.slow {\r\n  -webkit-animation-duration: 2s;\r\n  animation-duration: 2s;\r\n}\r\n\r\n.animated.slower {\r\n  -webkit-animation-duration: 3s;\r\n  animation-duration: 3s;\r\n}\r\n\r\n@media (prefers-reduced-motion) {\r\n  .animated {\r\n    -webkit-animation: unset !important;\r\n    animation: unset !important;\r\n    -webkit-transition: none !important;\r\n    transition: none !important;\r\n  }\r\n}\r\n"; });
define('app',['exports', 'aurelia-framework', './src/services/service.js', './src/services/connect-string-converter.js', 'aurelia-router'], function (exports, _aureliaFramework, _service, _connectStringConverter, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_service.BackendService, _connectStringConverter.ConnectStringConverter, _aureliaRouter.Router), _dec(_class = function () {
    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Domain Tool';
      config.map([{ route: '', name: 'about', moduleId: 'about', title: 'About' }, { route: 'customer', name: 'customer', moduleId: 'customer', title: 'Customer' }, { route: 'tracking', name: 'tracking', moduleId: './dns/tracking', title: 'Tracking' }, { route: 'dkim', name: 'dkim', moduleId: './dns/dkim', title: 'DKIM' }, { route: 'cname', name: 'cname', moduleId: './dns/cname', title: 'Cname' }, { route: 'whois', name: 'whois', moduleId: './dns/whois', title: 'WhoIs' }, { route: 'drt/:slug', name: 'drt/:slug', moduleId: './customer-specific/drt', title: 'DRT', activationStrategy: this.determineActivationStrategy() }, { route: 'cqt/:slug', name: 'cqt/:slug', moduleId: './customer-specific/cqt', title: 'CQT', activationStrategy: this.determineActivationStrategy() }, { route: 'csc/:slug', name: 'csc/:slug', moduleId: './customer-specific/csc', title: 'CSC', activationStrategy: this.determineActivationStrategy() }]);
    };

    function App(BackendService, ConnectStringConverter, router) {
      _classCallCheck(this, App);

      this.BackendService = BackendService;
      this.ConnectStringConverter = ConnectStringConverter;
      this.router = router;

      this.modeDropDown = false;
      this.showSpecificDropDown = false;
      this.showDnsDropDown = false;
      this.showCustomerModal = false;
      this.dnsArrow = false;
      this.currentMode = "Select a Mode";

      this.customerArray = [];
      this.customerDisplayArray;
      this.customerInputDomain;
      this.selectedCustomer = "Select a Customer";
    }

    App.prototype.activate = function activate() {
      this.checkState();
      this.getAllCustomers();
    };

    App.prototype.attached = function attached() {
      this.setModalColors(this.currentMode);
    };

    App.prototype.determineActivationStrategy = function determineActivationStrategy() {
      return _aureliaRouter.activationStrategy.replace;
    };

    App.prototype.getAllCustomers = function getAllCustomers() {
      var _this = this;

      this.BackendService.getCustomers(this.queryAllCustomers).then(function (response) {
        response.data.forEach(function (customer) {
          var customerInfo = {
            customerName: customer.customername,
            customerID: customer.customer_id,
            domainName: customer.domainname,
            connectString: customer.sqlconnectstring,
            sql: ''
          };
          _this.customerArray.push(customerInfo);
        });
      });
    };

    App.prototype.selectCustomer = function selectCustomer(event) {
      var _this2 = this;

      var selectedCustomer;
      var name = event.toElement.parentNode.children[1].value;
      this.customerArray.forEach(function (customer) {
        if (customer.customerName == name) {
          customer.sql = _this2.ConnectStringConverter.convertSqlString(customer.connectString);
          selectedCustomer = customer;
        }
      });
      this.selectedCustomer = selectedCustomer;
      this.showCustomerModal = false;
      this.router.navigateToRoute(this.router.currentInstruction.config.name, {
        slug: selectedCustomer.sql.server + '$' + selectedCustomer.sql.database + '$' + selectedCustomer.customerName + '$' + selectedCustomer.domainName
      });
    };

    App.prototype.searchForCustomersByDomain = function searchForCustomersByDomain() {
      var input = this.customerInputDomain;
      var displayArray = [];
      this.customerArray.forEach(function (customer) {
        if (customer.customerName.toLowerCase().includes(input)) {
          displayArray.push(customer);
        }
      });
      this.customerDisplayArray = displayArray.slice(0, 9);
      return true;
    };

    App.prototype.turnOffAllToggles = function turnOffAllToggles() {
      this.modeDropDown = false;
      this.showSpecificDropDown = false;
      this.showDnsDropDown = false;
    };

    App.prototype.genericToggle = function genericToggle(attribute) {
      if (attribute == 'modeDropDown') {
        if (this[attribute] == false) {
          this[attribute] = true;
          this.showSpecificDropDown = false;
          this.showDnsDropDown = false;
        } else {
          this[attribute] = false;
        }
      } else if (attribute == 'showSpecificDropDown') {
        if (this[attribute] == false) {
          this[attribute] = true;
          this.modeDropDown = false;
          this.showDnsDropDown = false;
        } else {
          this[attribute] = false;
        }
      } else if (attribute == 'showDnsDropDown') {
        if (this[attribute] == false) {
          this[attribute] = true;
          this.modeDropDown = false;
          this.showSpecificDropDown = false;
        } else {
          this[attribute] = false;
        }
      } else if (attribute == 'showCustomerModal') {
        if (this[attribute] == false) {
          this[attribute] = true;
          this.modeDropDown = false;
          this.showSpecificDropDown = false;
          this.showDnsDropDown = false;
        } else {
          this[attribute] = false;
        }
      }
    };

    App.prototype.setModalColors = function setModalColors(mode) {
      var modalHead = document.getElementsByClassName('modal-card-head');
      modalHead[0].className = 'modal-card-head';
      modalHead[0].classList.add(mode);
    };

    App.prototype.setMode = function setMode(event) {
      var mode = event.toElement.innerText;
      var element = document.getElementsByTagName('html');
      element[0].className = '';
      element[0].classList.add(mode);
      localStorage.setItem("mode", mode);
      this.currentMode = mode;
      this.modeDropDown = false;
      this.setModalColors(mode);
    };

    App.prototype.checkState = function checkState() {
      var mode = localStorage.getItem('mode');
      var element = document.getElementsByTagName('html');
      element[0].classList.add(mode);
      if (mode == null) {
        this.currentMode = "Select a Mode";
      } else {
        this.currentMode = mode;
      }
    };

    return App;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n   <nav class=\"navbar\" role=\"navigation\" aria-label=\"main navigation\">\n      <div class=\"navbar-brand\">\n         <a class=\"navbar-item logo-padding\" route-href=\"about\">\n         <img class= \"logo\" src=\"./src/assets/sflogo.png\" width=\"112\" height=\"28\">\n         </a>\n      </div>\n      <div class=\"navbar-menu\">\n         <div class=\"navbar-start\">\n            <a route-href=\"customer\" class=\"navbar-item\">\n            Admin Tool\n            </a>\n\n            <div class=\"dropdown\" class.bind=\"showDnsDropDown ? 'is-active' : ''\">\n                <div class=\"dropdown-trigger\" click.delegate=\"genericToggle('showDnsDropDown')\">\n                    <button class=\"button dropdown-button\" aria-haspopup=\"true\" aria-controls=\"dropdown-menu\">\n                      <span>DNS</span>\n                      <span class=\"icon is-small\">\n                        <i class=\"fas fa-angle-down\" class.bind=\"showDnsDropDown ? 'hidden' : ''\" aria-hidden=\"true\"></i>\n                        <i class=\"fas fa-angle-up\" class.bind=\"showDnsDropDown ? '' : 'hidden'\" aria-hidden=\"true\"></i>\n                      </span>\n                    </button>\n                  </div>\n                  <div class=\"dropdown-menu\" id=\"dropdown-menu\" role=\"menu\">\n                    <div class=\"dropdown-content\">\n                      <a route-href=\"tracking\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showDnsDropDown')\">\n                      Tracking\n                      </a>\n                      <a route-href=\"dkim\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showDnsDropDown')\">\n                      SPF/DKIM\n                      </a>\n                      <a route-href=\"cname\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showDnsDropDown')\">\n                      CNAME\n                      </a>\n                      <a route-href=\"whois\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showDnsDropDown')\">\n                      Who Is\n                      </a>\n                    </div>\n                  </div>\n                </div>\n\n                        <div class=\"dropdown\" class.bind=\"showSpecificDropDown ? 'is-active' : ''\">\n                            <div class=\"dropdown-trigger\" click.delegate=\"genericToggle('showSpecificDropDown')\">\n                                <button class=\"button dropdown-button\" aria-haspopup=\"true\" aria-controls=\"dropdown-menu\">\n                                  <span>Customer Specific</span>\n                                  <span class=\"icon is-small\">\n                                    <i class=\"fas fa-angle-down\" class.bind=\"showSpecificDropDown ? 'hidden' : ''\" aria-hidden=\"true\"></i>\n                                    <i class=\"fas fa-angle-up\" class.bind=\"showSpecificDropDown ? '' : 'hidden'\" aria-hidden=\"true\"></i>\n                                  </span>\n                                </button>\n                              </div>\n                              <div class=\"dropdown-menu is-centered\" id=\"dropdown-menu\" role=\"menu\">\n                                <div class=\"dropdown-content\">\n                                  <a route-href=\"route: drt/:slug; params.bind: {slug: selectedCustomer.sql.server +\n                                    '$' +  selectedCustomer.sql.database + '$' + selectedCustomer.customerName + '$' + selectedCustomer.domainName}\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showSpecificDropDown')\">\n                                  Deliverability Reset\n                                  </a>\n                                  <a route-href=\"route: cqt/:slug; params.bind: {slug: selectedCustomer.sql.server +\n                                    '$' +  selectedCustomer.sql.database + '$' + selectedCustomer.customerName + '$' + selectedCustomer.domainName}\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showSpecificDropDown')\">\n                                  Contact Query\n                                  </a>\n                                  <a route-href=\"route: csc/:slug; params.bind: {slug: selectedCustomer.sql.server +\n                                    '$' +  selectedCustomer.sql.database + '$' + selectedCustomer.customerName + '$' + selectedCustomer.domainName}\" class=\"navbar-item\" mouseup.trigger=\"genericToggle('showSpecificDropDown')\">\n                                  Campaign Monitor\n                                  </a>\n                                </div>\n                              </div>\n                            </div>\n\n         </div>\n         <button class=\"button mode-two-button\" click.delegate=\"genericToggle('showCustomerModal')\" class.bind=\"selectedCustomer.customerName ? '' : 'hidden'\">${ selectedCustomer.customerName }</button>\n         <button class=\"button mode-two-button customer-button\" click.delegate=\"genericToggle('showCustomerModal')\" class.bind=\"selectedCustomer.customerName ? 'hidden' : ''\">${ selectedCustomer }</button>\n\n         <div class=\"modal is-centered\" class.bind=\"showCustomerModal ? 'is-active' : ''\">\n            <div class=\"modal-background\"></div>\n            <div class=\"modal-card is-\">\n               <header class=\"modal-card-head\">\n                  <p class=\"modal-card-title\">Customer Select</p>\n                  <button class=\"delete\" click.trigger=\"genericToggle('showCustomerModal')\" aria-label=\"close\"></button>\n               </header>\n               <section class=\"is-centered modal-card-body\">\n                 <form>\n                  <p class=\"title is-6\"> Start typing a customer name:</p>\n                  <input class=\"input selected-customer\" list=\"customers\" class=\"input\" value.bind=\"customerInputDomain\" keyup.trigger=\"searchForCustomersByDomain()\">\n                  <datalist id=\"customers\">\n                    <option repeat.for=\"customer of customerDisplayArray\" value=\"${customer.customerName}\" click.delegate=\"selectCustomer($event)\">${customer.customerID}\n                  </datalist>\n                  <button class=\"button\" click.delegate=\"selectCustomer($event)\">Submit</button>\n                </form>\n               </section>\n            </div>\n         </div>\n\n         <div class=\"dropdown\" class.bind=\"modeDropDown ? 'is-active' : ''\">\n            <div class=\"dropdown-trigger\">\n               <button class=\"button mode-button\" click.delegate=\"genericToggle('modeDropDown')\" aria-haspopup=\"true\" aria-controls=\"dropdown-menu\">\n               <span class=\"drop-down-text\">${currentMode}</span>\n               <span class=\"icon is-small\">\n               <i class=\"fas fa-angle-down\" class.bind=\"modeDropDown ? 'hidden' : ''\" aria-hidden=\"true\"></i>\n               <i class=\"fas fa-angle-up\" class.bind=\"modeDropDown ? '' : 'hidden'\" aria-hidden=\"true\"></i>\n               </span>\n               </button>\n            </div>\n            <div class=\"dropdown-menu\" id=\"dropdown-menu\" role=\"menu\">\n               <div class=\"dropdown-content margin-right-dropdown\">\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Default\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Alex\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Eric\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Gio\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Jana\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Jeacoma\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Jess\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Lexanne\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  Michael\n                  </a>\n                  <a class=\"dropdown-item\" click.delegate=\"setMode($event)\">\n                  TJ\n                  </a>\n               </div>\n            </div>\n         </div>\n\n      </div>\n   </nav>\n   <router-view click.delegate=\"turnOffAllToggles()\"></router-view>\n</template>\n"; });
define('about',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Faq = exports.Faq = function () {
    function Faq() {
      _classCallCheck(this, Faq);

      this.trackingScript = false;
      this.dkim = false;
      this.cname = false;
      this.whoIs = false;
      this.rakesh = false;
      this.drt = false;
      this.cqt = false;
      this.campaignMonitor = false;
    }

    Faq.prototype.genericToggle = function genericToggle(attribute) {
      if (this[attribute] == false) {
        this[attribute] = true;
      } else {
        this[attribute] = false;
      }
    };

    return Faq;
  }();
});
define('text!about.html', ['module'], function(module) { module.exports = "<template>\r\n   <div class=\"cont margin-top-extra animated fadeIn faster\">\r\n      <div class=\"card\">\r\n         <div class=\"card-content animated fadeIn faster\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">Welcome ya SF'ers!</p>\r\n               <p>The idea for this application is to build tools that make our lives here at Salesfusion a little easier! Below is a description of each tool and what functions it can perform/how it works.\r\n                  If you have suggestions for other tools you would like to see built or bug reports/ways to improve this tool please send an email to tj.southern@salesfusion.com (or walk over to my desk :D)\r\n               </p>\r\n               <p class=\"is-bold\">Customer Specific Tools</p>\r\n               <p>Some tools will reference a specific customer and will not allow for user input. These tools are listed under the \"Customer-Specific\" dropdown menu. To select\r\n                  a customer for usage in these tools, simply click the button in the naviation bar and click on the desired customer. The selected customer will then be display in the button you clicked.\r\n               </p>\r\n               <p class=\"is-bold\">VPN Access</p>\r\n               <p>This tool will only be available for usage within the Salesfusion office unless you have VPN access. This tool will not work on any network that does not belong to Salesfusion.</p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--Begin Tracking Script -->\r\n      <div class=\"card margin-top animated slideIn\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('trackingScript')\">\r\n            <p class=\"card-header-title\">\r\n               Tracking Script\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"trackingScript ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"trackingScript ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content\" class.bind=\"trackingScript ? '' : 'hidden'\">\r\n            <div class=\"content animated fadeIn faster\">\r\n               <p class=\"is-bold\">What does this application do?</p>\r\n               <p>This application takes a given website and checks to see if the following companies tracking scripts are present. If a tracking script is found a \"true\" value will be returned, otherwise the value will default to false.</p>\r\n               <p class=\"is-bold margin-top\">How does this application check for tracking scripts?</p>\r\n               <p>This application uses http and https methods to load a websites HTML. It then scans the entire websites HTMl for common keywords found in tracking scripts. It will\r\n               also perform a check to see if Google Tag Manager is being used. If so it will query the Tag Manager script as well.</p>\r\n               <p class=\"is-bold margin-top\">Scripts this tool checks for:</p>\r\n               <p>Salesfusion, Click Dimensions, Pardot, Marketo, Hubspot, Google, Google Tag Manager\r\n               </p>\r\n            </div>\r\n      </div>\r\n      </div>\r\n      <!--End Tracking Script -->\r\n      <!--Begin DKIM Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('dkim')\">\r\n            <p class=\"card-header-title\">\r\n               SPF/DKIM\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"dkim ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"dkim ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"dkim ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">What does this application do?</p>\r\n               <p>This application pulls the spf and dkim records for the domain provided. It will pull all SPF records that begin with a v-record and the lone DKIM record. </p>\r\n               <p class=\"is-bold margin-top\">How does this application check to see if the DKIM/SPF records match?</p>\r\n               <p>It will first pull all SPF records for the domain provided that begin with a v-record. It will then check each to see if the string contains \"auth.msgapp.com\". If multiple SPF records are found one may still match but the overall result will return an error. After the SPF check is complete it will pull the DKIM record and directly compare it against the default Salesfusion DKIM record.</p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End DKIM Script -->\r\n      <!--Begin CNAME Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('cname')\">\r\n            <p class=\"card-header-title\">\r\n               Salesfusion CNAME Checker\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"cname ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"cname ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"cname ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">Salesfusion CNAME Checker</p>\r\n               <p>This queries against the Salesfusion database for a domain name. It then pulls all related CNAMEs to this domain and resolves them. It will then output in a table the results of the lookup.</p>\r\n               <p class=\"is-bold margin-top\">Singular CNAME Checker</p>\r\n               <p>This application simply runs an http lookup to see what a given domain resolves to.</p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End CNAME Script -->\r\n      <!--Begin CNAME Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('whoIs')\">\r\n            <p class=\"card-header-title\">\r\n               Who Is?\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"whoIs ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"whoIs ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"whoIs ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">What does this application do?</p>\r\n               <p> This application uses a third party API to perform a \"Who Is\" lookup on the given domain. It will return common infomrmation about the domains registry.</p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End CNAME Script -->\r\n      <!--Begin Rakesh Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('rakesh')\">\r\n            <p class=\"card-header-title\">\r\n               Admin Tool\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"rakesh ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"rakesh ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"rakesh ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">What is this?</p>\r\n               <p> This tool has been built and is maintained by Rakesh. This is a general tool for customer information and will eventually replace all functionality found in the current Admin Controller. Any suggestions for improvement should be directed towards Rakesh (rakesh.alladi@salesfusion.com).\r\n                  All updates made to his tool will be reflected here once browser cache has been cleared.\r\n               </p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End Rakesh Script -->\r\n      <!--Begin Tracking Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('drt')\">\r\n            <p class=\"card-header-title\">\r\n               Deliverability Reset\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"drt ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"drt ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"drt ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">What is this tool?</p>\r\n               <p>\r\n                 This tool allows a user to search a specific customers database for an email address. Information regarding that records deliverability standing is returned.\r\n                 If there are any issues with deliverability you can correct them by clicking the corresponding \"Reset\" button.\r\n               </p>\r\n               <p class=\"is-bold\">Notes:</p>\r\n                 For all tables there will be a corresponding message placed into a secondary field if a record is updated by this tool. Below is a key of what tables and fields will be populated:\r\n                 <br>\r\n                 <p class=\"is-bold margin-top-extra\">Tables and fields that will be updated:</p>\r\n                 <table class=\"drt-table table is-striped is-fullwidth is-narrow animated fadeIn faster\">\r\n                    <thead>\r\n                       <th>Tool:</th>\r\n                       <th>Table:</th>\r\n                       <th>Fields</th>\r\n                    </thead>\r\n                    <tr>\r\n                       <td class=\"is-bold\">Delete</td>\r\n                       <td>Contacts</td>\r\n                       <td>DeleteDate, Description</td>\r\n                    </tr>\r\n                    <tr>\r\n                       <td class=\"is-bold\">Guarded Watch</td>\r\n                       <td>SubscriberListEmails</td>\r\n                       <td>Status, Reason</td>\r\n                    </tr>\r\n                    <tr>\r\n                       <td class=\"is-bold\">Hard Bounce</td>\r\n                       <td>EmailDeliveryStatus</td>\r\n                       <td>Entire Row</td>\r\n                    </tr>\r\n                    <tr>\r\n                       <td class=\"is-bold\">Soft Bounce</td>\r\n                       <td>SystemSoftBounce</td>\r\n                       <td>Entire Row</td>\r\n                    </tr>\r\n                    <tr>\r\n                       <td class=\"is-bold\">OptOut</td>\r\n                       <td>Contacts</td>\r\n                       <td>OpOut, Assistantname</td>\r\n                    </tr>\r\n                    <tr>\r\n                       <td class=\"is-bold\">Supression</td>\r\n                       <td>SubscriberListEmails</td>\r\n                       <td>Status, Reason</td>\r\n                    </tr>\r\n                    <tr>\r\n                       <td class=\"is-bold\">Email Validation</td>\r\n                       <td>EmailValidation</td>\r\n                       <td>Status, DeletedReason</td>\r\n                    </tr>\r\n                    </table>\r\n\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End Tracking Script -->\r\n\r\n      <!--Begin CQT Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('cqt')\">\r\n            <p class=\"card-header-title\">\r\n              Contact Query\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"cqt ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"cqt ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"cqt ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">What is this?</p>\r\n               <p> This tool takes input of an email address and returns useful information regarding the specified record. This is data generally only available via SQL access.</p>\r\n               <p class=\"is-bold\">Can you add a column?</p>\r\n               <p> This tool aims to be customer ambigious and work across the board. As such only standard fields can be added/removed.</p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End CQT Script -->\r\n\r\n      <!--Begin Campaign Monitor Script -->\r\n      <div class=\"card margin-top\">\r\n         <header class=\"card-header\" click.delegate=\"genericToggle('campaignMonitor')\">\r\n            <p class=\"card-header-title\">\r\n              Campaign Monitor\r\n            </p>\r\n            <a class=\"card-header-icon\" aria-label=\"more options\">\r\n            <span class=\"icon\">\r\n            <i class=\"fas fa-angle-down\" class.bind=\"campaignMonitor ? 'hidden' : ''\" aria-hidden=\"true\"></i>\r\n            <i class=\"fas fa-angle-up\" class.bind=\"campaignMonitor ? '' : 'hidden'\" aria-hidden=\"true\"></i>\r\n            </span>\r\n            </a>\r\n         </header>\r\n         <div class=\"card-content animated fadeIn faster\" class.bind=\"campaignMonitor ? '' : 'hidden'\">\r\n            <div class=\"content\">\r\n               <p class=\"is-bold\">What is this?</p>\r\n               <p>This tool allows you to set a timer and auto-refresh campaign statistics. It will provide a completion percentage once the campaign has completed staging and the timer is turned on.</p>\r\n               <p class=\"is-bold\">Global Timeout</p>\r\n               <p>There is a global timeout of 15 minutes. All timers will stop running after fifteen minutes and be switched to the \"OFF\" state.</p>\r\n               <p class=\"is-bold\">Timer Values:</p>\r\n               <p>The minimum time-frame for a timer is a refresh 15 seconds. There is currently no ceiling on how high you set the timer.</p>\r\n            </div>\r\n         </div>\r\n      </div>\r\n      <!--End Campaign Monitor Script -->\r\n   </div>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map