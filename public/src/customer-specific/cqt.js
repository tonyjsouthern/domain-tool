import { inject } from 'aurelia-framework';
import { BackendService } from '../src/services/service.js';
import { ConnectStringConverter } from '../src/services/connect-string-converter.js'

@inject(BackendService, ConnectStringConverter)
export class CQT {

	constructor(BackendService, ConnectStringConverter) {
			// Injects
	    this.BackendService = BackendService;
	    this.ConnectStringConverter = ConnectStringConverter;
			// Storage
	    this.customer;
	    this.email;
	    this.errorMessage;
	    this.keys;
	    this.resultsNum;
	    this.results = [];
			// UI
			this.showInput = true;
	    this.showResults = false;
	    this.table;
	    this.dragger;
	}

	activate(params) {
	    this.slug = params.slug;
	    this.customer = this.ConnectStringConverter.convertUtmString(this.slug);
	}

	attached() {
	    this.populateSelectButton()
	    this.inputToggle()
	}

	runCqt() {
	    this.triggerInteractions();
	    this.BackendService.cqt(this.email, this.customer.server, this.customer.database)
	        .then((response) => {
	            if (response.data == "This record does not exist within the customer's database.") {
	                this.errorMessage = "This record does not exist within the customer's database."
	                this.removeLoader();
	            } else {
	                this.keys = Object.keys(response.data[0])
	                response.data.forEach((data) => {
	                    var tempArray = new Array
	                    tempArray.push(Object.values(data))
	                    this.results.push(tempArray[0])
	                    this.showResults = true;
	                })
	            }
	            this.removeLoader();
	            this.makeTableDraggable();
	        })
	}

	exportToExcel(table, name) {
	    var uri = 'data:application/vnd.ms-excel;base64,',
	        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
	        base64 = function(s) {
	            return window.btoa(unescape(encodeURIComponent(s)))
	        },
	        format = function(s, c) {
	            return s.replace(/{(\w+)}/g, function(m, p) {
	                return c[p];
	            })
	        }
	    if (!table.nodeType) table = document.getElementById(table)
	    var ctx = {
	        worksheet: name || 'Worksheet',
	        table: table.innerHTML
	    }
	    window.location.href = uri + base64(format(template, ctx))
	}

	// UI functions

	makeTableDraggable() {
	    this.table = document.getElementById('exportTable');
	    console.log(this.table)
	    this.dragger = tableDragger(this.table, {
	        mode: 'free',
	        dragHandler: '.handle',
	        onlyBody: true,
	        animation: 300
	    });
	    console.log(this.dragger)
	}

	dragColumn() {
	    this.dragger.on('drop', function(from, to) {
	        console(from);
	        console(to);
	    });
	}

	triggerInteractions() {
	    var element = document.getElementsByClassName("submit-button");
	    element[0].classList.add("is-loading");
	    this.errorMessage = false;
	    this.showResults = false;
	    this.results = [];
	}

	removeLoader() {
	    var element = document.getElementsByClassName("submit-button");
	    element[0].classList.remove("is-loading");
	}


	inputToggle() {
	    var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText
	    if (currentCustomer == "") {
	        this.showInput = false;
	    } else {
	        this.showInput = true;
	    }
	}

	populateSelectButton() {
	    var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText
	    var button = document.getElementsByClassName('customer-button')
	    if (currentCustomer == "") {
	        document.getElementsByClassName('customer-button')[0].innerText = "Select a Customer"
	    } else {
	        document.getElementsByClassName('customer-button')[0].innerText = currentCustomer
	    }
	}

}
