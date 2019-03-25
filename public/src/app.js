import { inject } from 'aurelia-framework';
import { BackendService } from './src/services/service.js';
import { ConnectStringConverter } from './src/services/connect-string-converter.js'
import { Router } from 'aurelia-router';
import {activationStrategy} from "aurelia-router";

@inject(BackendService, ConnectStringConverter, Router)
export class App {

 configureRouter(config, router) {
  this.router = router;
  config.title = 'Domain Tool';
  config.map([
    { route: '',          name: 'about',     moduleId: 'about',    title: 'About'     },
    { route: 'customer',  name: 'customer',  moduleId: 'customer', title: 'Customer'  },
    { route: 'tracking',  name: 'tracking',  moduleId: './dns/tracking', title: 'Tracking'  },
    { route: 'dkim',      name: 'dkim',      moduleId: './dns/dkim',     title: 'DKIM'      },
    { route: 'cname',     name: 'cname',     moduleId: './dns/cname',    title: 'Cname'     },
    { route: 'whois',     name: 'whois',     moduleId: './dns/whois',    title: 'WhoIs'     },
    { route: 'drt/:slug', name: 'drt/:slug', moduleId: './customer-specific/drt',      title: 'DRT', activationStrategy: this.determineActivationStrategy() },
    { route: 'cqt/:slug', name: 'cqt/:slug', moduleId: './customer-specific/cqt',      title: 'CQT', activationStrategy: this.determineActivationStrategy() },
    { route: 'csc/:slug', name: 'csc/:slug', moduleId: './customer-specific/csc',      title: 'CSC', activationStrategy: this.determineActivationStrategy() }

  ]);
 }
 constructor(BackendService, ConnectStringConverter, router) {
 	// Injects
 	this.BackendService = BackendService;
 	this.ConnectStringConverter = ConnectStringConverter;
 	this.router = router;

 	this.modeDropDown = false;
  this.showSpecificDropDown = false;
  this.showDnsDropDown = false;
 	this.showCustomerModal = false;
 	this.currentMode = "Select a Mode"

 	this.customerArray = [];
 	this.customerDisplayArray
 	this.customerInputDomain;
 	this.selectedCustomer = "Select a Customer"
 }

 activate() {
 	this.checkState();
 	this.getAllCustomers();
 }

 attached() {
 	this.setModalColors(this.currentMode)
 }

 determineActivationStrategy() {
 	return activationStrategy.replace;
 }

 getAllCustomers() {
 	this.BackendService.getCustomers(this.queryAllCustomers).then((response) => {
 		response.data.forEach((customer) => {
 			var customerInfo = {
 				customerName: customer.customername,
 				customerID: customer.customer_id,
 				domainName: customer.domainname,
 				connectString: customer.sqlconnectstring,
 				sql: ''
 			}
 			this.customerArray.push(customerInfo)
 		})
 	})
 }

 selectCustomer(event) {
 	var selectedCustomer;
 	var name = event.toElement.parentNode.children[1].value;
 	this.customerArray.forEach((customer) => {
 		if (customer.customerName == name) {
 			customer.sql = this.ConnectStringConverter.convertSqlString(customer.connectString)
 			selectedCustomer = customer;
 		}
 	})
 	this.selectedCustomer = selectedCustomer;
 	this.showCustomerModal = false;
 	this.router.navigateToRoute(this.router.currentInstruction.config.name, {
 		slug: selectedCustomer.sql.server + '$' + selectedCustomer.sql.database + '$' + selectedCustomer.customerName + '$' + selectedCustomer.domainName
 	});
 }

 searchForCustomersByDomain() {
 	var input = this.customerInputDomain;
 	var displayArray = [];
 	this.customerArray.forEach(function (customer) {
 		if (customer.customerName.toLowerCase().includes(input)) {
 			displayArray.push(customer);
 		}
 	})
 	this.customerDisplayArray = displayArray.slice(0, 9);
 	return true;
 }

turnOffAllToggles(){
  this.modeDropDown = false;
  this.showSpecificDropDown = false;
  this.showDnsDropDown = false;
}

genericToggle(attribute) {
  console.log(attribute)
  if ( attribute == 'modeDropDown') {
    if(this[attribute] == false){
      this[attribute] = true;
      this.showSpecificDropDown = false;
      this.showDnsDropDown = false;
    }else{
      this[attribute] = false;
    }
  } else if (attribute == 'showSpecificDropDown') {
    if(this[attribute] == false){
      this[attribute] = true;
      this.modeDropDown = false;
      this.showDnsDropDown = false;
    }else{
      this[attribute] = false;
    }
  } else if (attribute == 'showDnsDropDown') {
    if(this[attribute] == false){
      this[attribute] = true;
      this.modeDropDown = false;
      this.showSpecificDropDown = false;
    }else{
      this[attribute] = false;
    }
  } else if(attribute == 'showCustomerModal') {
    if(this[attribute] == false){
      this[attribute] = true;
      this.modeDropDown = false;
      this.showSpecificDropDown = false;
      this.showDnsDropDown = false;
    }else{
      this[attribute] = false;
    }
  }
}

 setModalColors(mode) {
 	var modalHead = document.getElementsByClassName('modal-card-head')
 	modalHead[0].className = 'modal-card-head'
 	modalHead[0].classList.add(mode)
 }


 setMode(event) {
 	var mode = event.toElement.innerText;
 	var element = document.getElementsByTagName('html');
 	element[0].className = ''
 	element[0].classList.add(mode);
 	localStorage.setItem("mode", mode);
 	this.currentMode = mode;
 	this.modeDropDown = false;
 	this.setModalColors(mode)
 }

 checkState() {
 	var mode = localStorage.getItem('mode')
 	var element = document.getElementsByTagName('html')
 	element[0].classList.add(mode)
 	if (mode == null) {
 		this.currentMode = "Select a Mode"
 	} else {
 		this.currentMode = mode;
 	}
 }

 }
