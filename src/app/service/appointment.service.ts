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

    getAllAppintments(date, branch) {
        return this.axios.get(this.URL + 'brancanddaterepot/?appDate=' + date + '&branchid=' + branch, {
            headers: {
                // 'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxOTY5NSIsImlhdCI6MTU5MDQ4MDMxMywic3ViIjoiYXV0aF90b2tlbiIsImlzcyI6InBlbnNpb25kcHQiLCJiIjoidGVzdHBkNiIsImEiOiJQRU5TSU9OX1BPSU5UIiwiZCI6MjIsImV4cCI6MTU5MDUwOTExM30.wac0Ccisg8vBcFlwroWGdcOZ3gF7l463RkaA_alZdXU',
                'token' : localStorage.getItem("token")
              }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

    }
}