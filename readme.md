# Domain Tool
This is a collection of small applications for internal usage at Salesfusion. These applications intend to automate or make easier repetitive tasks completed by the support team.

### Tool List:
##### Tracking Script:
This application takes a given website and checks to see if the following companies tracking scripts are present. If a tracking script is found a "true" value will be returned, otherwise the value will default to false.It loads the website via HTTPS and then scans the HTML for script tags.

###### The follow scripts are supported:
 - Salesfusion
 - Click Dimensions
 - Pardot
 - Marketo
 - Hubspot
 - Google

##### SPF Dkim:
This tool will first pull all SPF records for the domain provided that begin with a v-record. It will then check each to see if the string contains "auth.msgapp.com". If multiple SPF records are found one may still match but the overall result will return an error. After the SPF check is complete it will pull the DKIM record and directly compare it against the default Salesfusion DKIM record.

##### CNAME Checker:
This tool queries against a database and pulls all related CNAMES. It then resolves those cnames and outputs the results into an HTML table on the page.

##### Who IS:
This application uses a third party API to perform a "Who Is" lookup on the given domain. It will return common infomrmation about the domains registry.

##### Deliverability Reset:
This tool allows a user to search a specific customers database for an email address. Information regarding that records deliverability standing is returned. If there are any issues with deliverability you can correct them by clicking the corresponding "Reset" button.

| Tool:            | Table:               | Fields                  |
|------------------|----------------------|-------------------------|
| Delete           | Contacts             | DeleteDate, Description |
| Guarded Watch    | SubscriberListEmails | Status, Reason          |
| Hard Bounce      | EmailDeliveryStatus  | Entire Row              |
| Soft Bounce      | SystemSoftBounce     | Entire Row              |
| OptOut           | Contacts             | OpOut, AssistantName    |
| Supression       | SubscriberListEmails | Status, Reason          |
| Email Validation | EmailValidation      | Status, DeletedReason   |

###### Campaign Monitor
This tool allows you to set a timer and auto-refresh campaign statistics. It will provide a completion percentage once the campaign has completed staging and the timer is turned on. The global timeout and rest is 15 minutes. After this time has elapsed all timers will be terminated and processes will be switch to the "OFF" state.
