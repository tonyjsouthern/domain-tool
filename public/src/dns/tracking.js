import { inject } from 'aurelia-framework';
import { DnsService } from '../src/services/dns-service.js';

@inject(DnsService)
export class Index {

  constructor (DnsService) {
    // Injects
    this.DnsService = DnsService;
    // Storage
    this.domain;
    this.tfObject;
    // UI
    this.showResults = false;
    this.showError = false
  }

  activate(){
  }

  submitController () {
    this.addLoader('submit-button')
    this.showResults = false;
    this.showError = false;
    var adjUrl = this.validateInput()
    this.checkTracking(adjUrl)
  }

  checkTracking(url){
    this.DnsService.checkDomainTracking(url)
    .then((response) =>{
      console.log(response.data)
      this.tfObject = response.data;
      this.showResults = true;
      this.removeLoader("is-loading")
    })
  }

  // UI Functions
  validateInput(){
    if (this.domain.indexOf("https") != -1) {
      return "http" + this.domain.slice(5)
    } else if (this.domain.indexOf(".") == -1) {
        this.showError = true;
        this.showResults = false;
    } else {
      return "http://" + this.domain;
    }
  }

  addLoader(elementClass){
    var element = document.getElementsByClassName(elementClass)
    element[0].classList.add("is-loading")
  }

  removeLoader(elementClass){
    var element = document.getElementsByClassName(elementClass)
    element[0].classList.remove("is-loading")
  }


}
