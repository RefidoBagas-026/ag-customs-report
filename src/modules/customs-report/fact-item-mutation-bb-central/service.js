import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

// const serviceUri = 'customs-reports';
const serviceUri = 'mutation-beacukai';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        // super(http, aggregator, config, "customs-report");
        super(http, aggregator, config, "purchasing");
    }

    search(info) {
        console.log(serviceUri);
        let endpoint = `${serviceUri}/bbCentrals`;
        // console.log(endpoint)
        return super.list(endpoint, info);
    }

    generateExcel(info) {
        console.log(info);
        let endpoint = `${serviceUri}/bbCentrals/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
        return super.getXls(endpoint);
    }
}