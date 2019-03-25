export class Faq {

 constructor() {
  this.trackingScript  = false;
  this.dkim            = false;
  this.cname           = false;
  this.whoIs           = false;
  this.rakesh          = false;
  this.drt             = false;
  this.cqt             = false;
  this.campaignMonitor = false;
 }

 genericToggle(attribute) {   
   if (this[attribute] == false) {
       this[attribute] = true;
   } else {
       this[attribute] = false;
   }
 }

}
