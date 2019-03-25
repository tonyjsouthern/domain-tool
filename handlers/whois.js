function whois(req, res, next) {
 var domain = req.params.domain;

 class DNSprofile {
  constructor(whoIs, mx, txt, ns, ptr) {
   this.whoIs = whoIs;
   this.mx = mx;
   this.txt = txt;
   this.ns = ns;
   this.ptr = ptr;
  }
 }

 runChecks();

 async function runChecks() {
  var whoIs = await getWhoIs(domain);
  var mx = await getRecord(req.dns.resolveMx);
  var txt = await getRecord(req.dns.resolveTxt);
  var ns = await getRecord(req.dns.resolveNs);
  var ptr = await getRecord(req.dns.resolvePtr);
  var completedDNSprofile = new DNSprofile(whoIs, mx, txt, ns, ptr)
  await res.send(completedDNSprofile)
 }

 async function getWhoIs() {
   var whoIs = await req.axios({
    method: 'get',
    url: 'https://jsonwhoisapi.com/api/v1/whois?identifier=' + domain,
    auth: {
     username: '584087300',
     password: 'nOa4CTLvF2ZAPbULgtDBtQ'
    }
   })
   return whoIs.data;
 }

 async function getRecord(dnsFunction) {
  try {
   var store = await dnsFunction(domain);
   return store;
  } catch (error) {
   var errorArray = new Array;
   errorArray.push(error);
   return errorArray;
  }
 }

}

module.exports = whois;
