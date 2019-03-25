export class ConnectStringConverter {

	constructor() {
    this.connectObject = {
      server: "",
      database: ""
    }

		this.utmConnectObject = {
			customerName: "",
			server: "",
      database: "",
			domainName: ""
		}
	}

  convertSqlString(string) {
    var splitString = string.split(";")
    this.connectObject.server = splitString[0].substr(7)
    this.connectObject.database = splitString[3].substr(9)
    return this.connectObject;
  }

	convertUtmString (string) {
		var splitString = string.split("$")
		this.utmConnectObject.server = splitString[0];
		this.utmConnectObject.database = splitString[1];
		this.utmConnectObject.customerName = splitString[2];
		this.utmConnectObject.domainName = splitString[3];
		return this.utmConnectObject
	}

}
