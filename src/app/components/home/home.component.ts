import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonService } from '../../service/common.service'
import { PensionerService } from '../../service/pensioner.service'
import { AppointmentService } from '../../service/appointment.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  requestForm: FormGroup;
  mindate: Date;

  pensionTypes: any[] = [
    { value: 'Pensioner' },
    { value: 'Non pensioner' },
  ];

  branches: any[]

  timeSlots: any[]

  disabled: boolean = true

  constructor(
    private commonService: CommonService,
    private pensionerService: PensionerService,
    private appointmentService: AppointmentService,
    private _snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.requestForm = new FormGroup({
      pensionerType: new FormControl('', Validators.required),
      nic: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      mobileNo: new FormControl('', Validators.required),
      pensionNo: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      reason: new FormControl('', Validators.required),
      appointmentDate: new FormControl('', Validators.required),
      timeSlot: new FormControl('', Validators.required),
    })

    this.mindate = new Date()

    this.loadBranches()
    this.loadTimeSlots()
  }

  /*
   * Submit function 
   */
  onSubmit(formDirective: FormGroupDirective) {

    console.log(this.requestForm.value);

    if (this.requestForm.status == 'VALID') {

      /*
       * Check appointment time slot 
       */
      this.appointmentService.checkTimeSlot(
        this.requestForm.value.appointmentDate,
        this.requestForm.value.timeSlot.slotId)
        .then(response => {

          if (response.code == 200) {

            /*
             * Time slot available - Save appointment details 
             */
            var payload = {
              "appinmentPensionerDetails": {
                "appDate": this.requestForm.value.appointmentDate,
                "mobileNo": this.requestForm.value.mobileNo,
                "name": this.requestForm.value.name,
                "nic": this.requestForm.value.nic,
                "pdBranchId": this.requestForm.value.branch,
                "penno": this.requestForm.value.pensionNo,
                "reason": this.requestForm.value.reason,
                "slot": this.requestForm.value.timeSlot.slot,
                "slotId": this.requestForm.value.timeSlot.slotId
              },
              "pdTimeSlot": {
              }
            }

            this.appointmentService.makeAppointment(payload).then(resp => {
              this._snackBar.open(resp.message + resp.refNumber, "Close", {
                duration: 4000,
                verticalPosition: 'top',
                horizontalPosition: 'end',
                panelClass: ['green-snackbar'],
              });

              formDirective.resetForm();
              this.requestForm.reset();
            })
              .catch(error => {
                console.log(error);
              });

          }
          else {
            /*
             * Time slot not availabe 
             */
            this._snackBar.open(response.message, "Close", {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          }

        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  /* 
   * Get pensioner details using NIC and fill in input fields
   */
  changeNIC() {

    this.pensionerService.getPensioner(this.requestForm.value.nic).then(response => {

      this.requestForm = new FormGroup({
        pensionerType: new FormControl(this.requestForm.value.pensionerType, Validators.required),
        nic: new FormControl(this.requestForm.value.nic, Validators.required),
        name: new FormControl(response.name, Validators.required),
        mobileNo: new FormControl(response.mobileNo, Validators.required),
        pensionNo: new FormControl(response.pensionNo, Validators.required),
        branch: new FormControl(this.requestForm.value.branch, Validators.required),
        reason: new FormControl(this.requestForm.value.reason, Validators.required),
        appointmentDate: new FormControl(this.requestForm.value.appointmentDate, Validators.required),
        timeSlot: new FormControl(this.requestForm.value.timeSlot, Validators.required),
      })
    })
      .catch(error => {
        this.requestForm = new FormGroup({
          pensionerType: new FormControl(this.requestForm.value.pensionerType, Validators.required),
          nic: new FormControl(this.requestForm.value.nic, Validators.required),
          name: new FormControl('', Validators.required),
          mobileNo: new FormControl('', Validators.required),
          pensionNo: new FormControl('', Validators.required),
          branch: new FormControl(this.requestForm.value.branch, Validators.required),
          reason: new FormControl(this.requestForm.value.reason, Validators.required),
          appointmentDate: new FormControl(this.requestForm.value.appointmentDate, Validators.required),
          timeSlot: new FormControl(this.requestForm.value.timeSlot, Validators.required),
        })
      });
  }

  /*
   * Load all branches 
   */
  loadBranches() {
    this.commonService.getBranches().then(response => {
      this.branches = response.data
    })
      .catch(error => {
        console.log(error);
      });
  }


  /*
   * Load all available time slots 
   */
  loadTimeSlots() {
    this.commonService.getTimeSlots().then(response => {
      this.timeSlots = response.data
    })
      .catch(error => {
        console.log(error);
      });
  }
}






