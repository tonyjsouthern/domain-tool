import { inject } from 'aurelia-framework';
import { ResetService } from '../src/services/reset-service.js';
import { ConnectStringConverter } from '../src/services/connect-string-converter.js'

@inject(ResetService, ConnectStringConverter)
export class DRT {

  constructor(ResetService, ConnectStringConverter) {
		// Injects
		this.ResetService = ResetService;
		this.ConnectStringConverter = ConnectStringConverter;
    // Storage
    this.customer;
    this.error;
    this.results;
    this.email;
    // UI
    this.showResults = false;
    this.showInput = true;
  }

  activate (params) {
    this.slug = params.slug;
    this.customer = this.ConnectStringConverter.convertUtmString(this.slug);
  }

  attached() {
    this.populateSelectButton()
    this.inputToggle()
  }

  runDrtCheck() {
    this.addLoader("submit-button");
    this.showResults = false;
    this.error = false;
    this.ResetService.drt(this.email, this.customer.server, this.customer.database)
    .then((response) =>{
      if (response.data == "This record does not exist within the customers database."){
        this.error = "This record does not exist within the customers database."
        this.showResults = false;
      }else{
        this.results = response.data;
        this.showResults = true;
        this.error= '';
      }
      this.removeLoader("is-loading");
    })
  }

  genericUpdates(serviceFunction, key){
    this.addLoader(key)
    serviceFunction(this.email, this.customer.server, this.customer.database)
    .then((response)=>{
      this.results[key].value = false;
      this.removeLoader('is-loading')
    })
  }

  // UI functions
  addLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass)
      element[0].classList.add("is-loading")
  }

  removeLoader(elementClass) {
      var element = document.getElementsByClassName(elementClass)
      element[0].classList.remove("is-loading")
  }

  inputToggle() {
    var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText
    if (currentCustomer) {
      this.showInput = false;
    }else{
      this.showInput = true;
    }
  }

  populateSelectButton () {
    var currentCustomer = document.getElementsByClassName('current-customer')[0].innerText
    var button = document.getElementsByClassName('customer-button')
    if (currentCustomer == "") {
    document.getElementsByClassName('customer-button')[0].innerText = "Select a Customer"
    }else{
    document.getElementsByClassName('customer-button')[0].innerText = currentCustomer
    }
  }
}
