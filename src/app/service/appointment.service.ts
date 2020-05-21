import { Config } from './config'
import { Injectable } from '@angular/core';
import Axios from 'axios';

@Injectable()
export class AppointmentService {
    private axios: any;
    private URL: any

    constructor(private config: Config) {
        this.axios = Axios;
        this.URL = config.baseURl

    }
    checkTimeSlot(date, timeSlot) {
        return this.axios.get(this.URL + 'avalabilitycheck/' + date + '/' + timeSlot, {
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }

    makeAppointment(payload) {
        return this.axios.post(this.URL + 'save', payload, {
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });
    }
}