export class BackendService {

    constructor() {
    }

    cqt(email, server, database) {
        return axios.post('/cqt', {
            email: email,
            server: server,
            database: database
        });
    }

    // campaign monitor service calls
    csc(campaign_id, server, database) {
        return axios.post('/campaignstatus', {
            campaign_id: campaign_id,
            server: server,
            database: database
        });
    }

    campaignCount(campaign_id, domain) {
        return axios.post('/campaigncount', {
            campaign_id: campaign_id,
            domain: domain
        });
    }

	// sql based routes
    getCustomers(query, server, database) {
        return axios.get('/get-customers');
    }

}
