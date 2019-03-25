export class DnsService {

  checkDomainTracking(domain) {
      return axios.post('/tracking', {
          domain: domain
      });
  }

  // DNS based routes
  checkDomainDkim(domain) {
      return axios.get('/dkim/' + domain);
  }

  checkDomainSpf(domain) {
      return axios.get('/spf/' + domain);
  }

  checkCname(domain) {
      return axios.get('/cname/' + domain);
  }

  checkCnameSingular(domain) {
      return axios.get('/cnamesingular/' + domain);
  }

  checkWhois(domain) {
      return axios.get('/whois/' + domain);
  }
}
