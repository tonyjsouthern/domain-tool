import { inject } from 'aurelia-framework';
import { BackendService } from '../src/services/service.js';
import { ConnectStringConverter } from '../src/services/connect-string-converter.js'

@inject(BackendService, ConnectStringConverter)
export class Csc {
	constructor(BackendService, ConnectStringConverter) {
		// Injectors
	    this.BackendService = BackendService;
	    this.ConnectStringConverter = ConnectStringConverter;
	    // Storage
	    this.customer;
	    this.results;
			this.inputVal;
			this.campaign_id;
			this.campaignCount;
			this.percentage 				= 0;
	    this.timerOn 						= false;
	    this.timerButton    		= 'OFF';
	    this.pendingEmails 			= 0;
	    // UI
	    this.showResults 				= false;
	    this.showOverView 			= true;
			this.showExists 				= false;
			this.showPercentage 		= false;
			this.showRecipientCount = false;
	    this.showLists
	}

	activate(params) {
	    this.slug = params.slug;
	    this.customer = this.ConnectStringConverter.convertUtmString(this.slug);
	}

	attached() {
	    this.populateSelectButton()
	    this.inputToggle()
	}

	init(){
		if (this.inputVal == undefined) {
			alert("Please Enter a Valid Campaign ID.")
		}else{
			// get rid of this this.showResults = false;
			this.campaign_id = this.inputVal
			this.addLoader("submit-button");
			this.getCampaignStatusInit();
		}
	}
// ----- CAMPAIGN FUNCTIONS ----- //
// Initial campaign status fired on submit button click
	getCampaignStatusInit() {
		this.turnTimerOff();
		this.showRecipientCount = false;
		this.showPercentage = false;
		this.showResults == false;
	    return this.BackendService.csc(this.campaign_id, this.customer.server, this.customer.database)
	        .then((response) => {
	            this.results = response.data;
							if (this.results.campaignerOverview.length == 0){
								this.showExists = true;
							}else{
								this.showexists = false;
								this.getCampaignCount(this.campaign_id)
								this.getNumOfPendingEmails(response.data.campaignerActualCount)
								this.showResults = true;
							}
							this.removeLoader("is-loading")
	        })
	}

// Secondary campaign status fired on timer switch
	getCampaignStatusSecondary() {
			return this.BackendService.csc(this.campaign_id, this.customer.server, this.customer.database)
					.then((response) => {
							this.results = response.data;
							this.getNumOfPendingEmails(response.data.campaignerActualCount)
							this.removeLoader("is-loading")
					})
	}

	// Gets the total count of campaign by calling mercury API
	getCampaignCount(id) {
	    return this.BackendService.campaignCount(id, this.customer.domainName)
	        .then((response) => {
	            this.campaignCount = response.data.count;
							this.showRecipientCount = true;
	        })
	}

// Gets the number of 1336 emails
	getNumOfPendingEmails(array) {
		this.pendingEmails = 0;
	    array.forEach((data) => {
	        if (data.status == 1337) {
	            this.pendingEmails = data.count;
	        }
	    })
	}

// Calculates the percentage the campaign has sent
	getCampaignPercentage() {
	    let counts = document.getElementsByClassName('counts')
	    let sum = 0;
	    for (let count of counts) {
	        sum += parseInt(count.innerText)
	    }
			let total = sum - this.pendingEmails;
	    var percentage =  (total / this.campaignCount) * 100
			this.percentage = percentage.toFixed(2);
			this.showPercentage = true
	}

// ----- TIMER FUNCTIONS ----- //
// Toggle for the timer controls fired by the on/off button
	controlTimer() {
	    if (this.timerOn == true) {
	        this.timerOn = false;
	        document.getElementsByClassName('toggle-button')[0].innerText = 'OFF'
	        this.cancelTimer();
	    } else {
				this.timerOn = true;
				document.getElementsByClassName('toggle-button')[0].innerText = 'ON'
				this.getCampaignStatusSecondary();
				this.getCampaignPercentage();
				this.startTimer();
				this.globalTimout()
	    }
	}

// Singular function for turning the timer off
	turnTimerOff() {
		this.timerOn = false;
		document.getElementsByClassName('toggle-button')[0].innerText = 'OFF'
		this.cancelTimer();
	}

// Starts the timer and calls the loop and sets the interval
	startTimer() {
	    var vm = this;
	    var numOfSeconds = document.getElementsByClassName('num-input')[0].value * 1000
	     setInterval(function() {
					vm.addLoader("toggle-button")
	        vm.getCampaignStatusSecondary()
					.then(()=> {
						vm.getCampaignPercentage()
					})
	    }, numOfSeconds);
	}

// Cancels all timers running globally
	cancelTimer() {
	    var highestTimeoutId = setTimeout(";");
	    for (var i = 0; i < highestTimeoutId; i++) {
	        clearTimeout(i);
	    }
	}

// timer controlling the glboal timeout
	globalTimout(){
		var vm = this;
		setTimeout(function(){
			vm.timerOn = false;
			document.getElementsByClassName('toggle-button')[0].innerText = 'OFF'
			vm.cancelTimer();
			// timer shuts off after fifteen minutes
		},900000 );
	}

	// UIfunctions
	addLoader(elementClass){
		var element = document.getElementsByClassName(elementClass)
		element[0].classList.add("is-loading")
	}

	removeLoader(elementClass){
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
