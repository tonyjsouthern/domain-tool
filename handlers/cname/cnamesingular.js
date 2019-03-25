function getCnameSingular(req, res, next) {
 var domain = req.params.domain;

 async function resolveCname() {
  try {
   var cname = await req.dns.resolveCname(domain)
   res.send(cname);
  } catch (error) {
   res.send(error.code);
  }
 }

 resolveCname();

}

module.exports = getCnameSingular;
