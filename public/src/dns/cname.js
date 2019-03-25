import { inject } from 'aurelia-framework';
import { DnsService } from '../src/services/dns-service.js';

@inject(DnsService)
export class Cname {

	constructor(DnsService) {
	    // Injects
	    this.DnsService = DnsService;
	    // Storage
	    this.cname;
	    this.cnameSingular;
	    this.results;
	    this.resultsSingular;
	    // UI
	    this.showSfChecker = true;
	    this.showSinglularChecker = false;
	    this.showResults = false;
	    this.showError = false;

	}

	checkCname() {
	    this.showResults = false;
	    this.addLoader("submit-button")
	    this.DnsService.checkCname(this.cname).then((response) => {
	        if (response.data == 'Please enter a valid Salesfusion domain') {
	            this.results = response.data;
	            this.showResults = false;
	            this.showError = true;
	        } else if (this.cname == undefined) {
	            this.results = 'Please enter a valid Salesfusion domain';
	            this.showResults = false;
	            this.showError = true;
	        } else {
	            this.results = response.data;
	            this.showResults = true;
	            this.showError = false;
	        }
	        this.removeLoader('is-loading')
	    });
	}

	checkCnameSingular() {
	    this.resultsSingular = false;
	    this.addLoader("submit-button-two")
	    this.DnsService.checkCnameSingular(this.cnameSingular).then((response) => {
	        this.resultsSingular = response.data;
	        this.removeLoader('is-loading')
	    })
	}

	// UI Functions
	addLoader(elementClass) {
	    var element = document.getElementsByClassName(elementClass)
	    element[0].classList.add("is-loading")
	}

	removeLoader(elementClass) {
	    var element = document.getElementsByClassName(elementClass)
	    element[0].classList.remove("is-loading")
	}

	genericToggle(attribute) {
	    if (this[attribute] == false) {
	        this[attribute] = true;
	    } else {
	        this[attribute] = false;
	    }
	}

}
