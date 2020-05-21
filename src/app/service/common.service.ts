import { Config } from '../service/config'
import { Injectable } from '@angular/core';
import Axios from 'axios';

@Injectable()
export class CommonService {
    private axios: any;
    private URL : any

    constructor(private config: Config) {
        this.axios = Axios;
        this.URL = config.baseURl

    }
    getBranches() {
        return this.axios.get(this.URL + 'pdbranch', {
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log("test");
            
            console.log(error);
        });
    }

    getTimeSlots(){
        return this.axios.get(this.URL + 'getallslots', {
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log("test");
            
            console.log(error);
        });
    }
}