export class ResetService {

  drt(email, server, database) {
      return axios.post('/drt', {
          email: email,
          server: server,
          database: database
      });
  }

  guardedWatch(email, server, database) {
    return axios.post('/guardedWatch', {
        email: email,
        server: server,
        database: database
    });
  }

  updateDeleted(email, server, database) {
    return axios.post('/deleted', {
        email: email,
        server: server,
        database: database
    });
  }

  emailValidation(email, server, database) {
    return axios.post('/validation', {
        email: email,
        server: server,
        database: database
    });
  }

  updateSupression(email, server, database) {
    return axios.post('/supression', {
        email: email,
        server: server,
        database: database
    });
  }

  updateOptout(email, server, database) {
    return axios.post('/optout', {
        email: email,
        server: server,
        database: database
    });
  }

  updateSoftBounce(email, server, database) {
    return axios.post('/softBounce', {
        email: email,
        server: server,
        database: database
    });
  }

  updateHardBounce(email, server, database) {
    return axios.post('/hardBounce', {
        email: email,
        server: server,
        database: database
    });
  }

  updateDelstatus(email, server, database) {
    return axios.post('/delstatus', {
        email: email,
        server: server,
        database: database
    });
  }

}
