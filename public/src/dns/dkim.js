import { inject } from 'aurelia-framework';
import { DnsService } from '../src/services/dns-service.js';

@inject(DnsService)
export class Dkim {

  constructor(DnsService) {
      // Injects
      this.DnsService = DnsService;
      // Storage
      this.domain;
      this.spfs;
      this.dkim;
      this.spfMessage;
      // ui
      this.tfSpf = false;
      this.showResults = false;
      this.showExamples = false;
      this.showCheckerResults = true;
      this.showAllText = false;
  }


  compareSpfDkim(domain) {
      this.showResults = false;
      this.addLoader('submit-button')
      var adjUrl = this.validateInput()
      this.spfMessage = "";
      this.dkimCheck(adjUrl);
      this.spfCheck(adjUrl);
  }

  spfCheck(url) {
      this.DnsService.checkDomainSpf(url)
          .then((response) => {
              this.spfs = response.data;
              if (this.spfs.length >= 2) {
                  this.tfSpf = false;
                  this.spfMessage = "Multiple SPF records were found. All SPF records should be combined into a singular record:";
              } else {
                  this.tfSpf = this.spfs[0].value;
              }
              this.removeLoader('is-loading')
          })
  }

  dkimCheck(url) {
      return this.DnsService.checkDomainDkim(url)
          .then((response) => {
              this.dkim = response.data;
              this.showResults = true;
          })
  }

  // UI functions
  validateInput() {
      if (this.domain.indexOf("https") != -1) {
          return this.domain.slice(8);
      } else if (this.domain.indexOf("http") != -1) {
          return this.domain.slice(7);
      } else {
          return this.domain;
      }
  }

  genericToggle(attribute) {
      if (this[attribute] == false) {
          this[attribute] = true;
      } else {
          this[attribute] = false;
      }
  }

  addLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass)
      element[0].classList.add("is-loading")
  }

  removeLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass)
      element[0].classList.remove("is-loading")
  }


}
