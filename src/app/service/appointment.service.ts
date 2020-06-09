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
                // 'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NjkzIiwiaWF0IjoxNTkxNjk2NjUzLCJzdWIiOiJhdXRoX3Rva2VuIiwiaXNzIjoicGVuc2lvbmRwdCIsImIiOiJyZWNlcHRpb24iLCJhIjoiUkVDRVBUSU9OIiwiZCI6MSwiZXhwIjoxNTkxNzI1NDUzfQ.gDEBy61AHdTJH8eidVDByO9YxKIx25cCIyxV58X3FPI',
                'token' : localStorage.getItem("token")
              }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

    }

    getAppintmentsDate(date) {
        return this.axios.get(this.URL + 'brancanddaterepot/?appDate=' + date, {
            headers: {
                // 'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NjkzIiwiaWF0IjoxNTkxNjk2NjUzLCJzdWIiOiJhdXRoX3Rva2VuIiwiaXNzIjoicGVuc2lvbmRwdCIsImIiOiJyZWNlcHRpb24iLCJhIjoiUkVDRVBUSU9OIiwiZCI6MSwiZXhwIjoxNTkxNzI1NDUzfQ.gDEBy61AHdTJH8eidVDByO9YxKIx25cCIyxV58X3FPI',
                'token' : localStorage.getItem("token")
              }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

    }

    getAppintmentsBranch(branch) {
        return this.axios.get(this.URL + 'brancanddaterepot/?branchid=' + branch, {
            headers: {
                // 'token': 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NjkzIiwiaWF0IjoxNTkxNjk2NjUzLCJzdWIiOiJhdXRoX3Rva2VuIiwiaXNzIjoicGVuc2lvbmRwdCIsImIiOiJyZWNlcHRpb24iLCJhIjoiUkVDRVBUSU9OIiwiZCI6MSwiZXhwIjoxNTkxNzI1NDUzfQ.gDEBy61AHdTJH8eidVDByO9YxKIx25cCIyxV58X3FPI',
                'token' : localStorage.getItem("token")
              }
        }).then(function (response) {
            return response.data;
        }).catch(function (error) {
            console.log(error);
        });

    }
}