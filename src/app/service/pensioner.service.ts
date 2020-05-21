import { Config } from './config'
import { Injectable } from '@angular/core';
import Axios from 'axios';

@Injectable()
export class PensionerService {
    private axios: any;
    private URL: any

    constructor(private config: Config) {
        this.axios = Axios;
        this.URL = config.baseURl

    }
    getPensioner(nic) {
        return this.axios.get(this.URL + 'ifpensioner/' + nic, {
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }
}