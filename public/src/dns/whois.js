import { inject } from 'aurelia-framework';
import { DnsService } from '../src/services/dns-service.js';

@inject(DnsService)
export class WhoIs {

  constructor(DnsService) {
    // Injects
    this.DnsService = DnsService;
    // Storage
    this.domain;
    this.whoIsResults;
    // UI
    this.showResults = false;
    this.showDomainInfo = true;
    this.showMxInfo = true;
    this.showRegisterInfo = false;
    this.showNameServerInfo = false;
}

runWhoIs() {
    this.showResults = false;
    var element = document.getElementsByClassName("submit-button")
    element[0].classList.add("is-loading")
    this.DnsService.checkWhois(this.domain).then((response) => {
        this.whoIsResults = response.data;
        this.showResults = true;
        element[0].classList.remove("is-loading")
    });
}

// UI Functions
genericToggle(attribute) {
    if (this[attribute] == false) {
        this[attribute] = true;
    } else {
        this[attribute] = false;
    }
}

}
