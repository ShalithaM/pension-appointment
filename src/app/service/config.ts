import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    baseURl: String;

  constructor() {
    this.baseURl = 'http://portal.pensions.gov.lk:9181/dop-appointment-api/pdappointment/';
  }
}
