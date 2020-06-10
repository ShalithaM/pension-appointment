import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppointmentService } from '../../service/appointment.service'
import { CommonService } from '../../service/common.service'

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  searchForm: FormGroup;
  mindate: Date;
  myDateFilter: any;
  branches: any[]
  dataSource: MatTableDataSource<AppointmentData>;
  displayedColumns: string[] = ['appintmentId', 'name', 'nic', 'mobileNo', 'pdBranchName', 'reason', 'appDate', 'slot'];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private appointmentService: AppointmentService,
    private commonService: CommonService,
    private _snackBar: MatSnackBar
  ) {


  }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      branch: new FormControl(null),
      appointmentDate: new FormControl(null),
    })

    this.mindate = new Date()
    this.myDateFilter = (d: Date): boolean => {
      const day = d.getDay();
      // Prevent Saturday and Sunday from being selected.
      return day !== 0 && day !== 6;
    }

    this.loadBranches()
  }

  onSearch(formDirective: FormGroupDirective) {

    if (this.searchForm.status == 'VALID') {

      if (this.searchForm.value.appointmentDate !== null && this.searchForm.value.branch === null) {
        let newDate = new Date(this.searchForm.value.appointmentDate);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let date = newDate.getDate();

        var mm = String(month)
        var dd = String(date)
        if (month < 10) {
          mm = "0" + month;
        }
        if (date < 10) {
          dd = "0" + date;
        }
        var finalDate = `${year}-${mm}-${dd}`

        this.appointmentService.getAppintmentsDate(finalDate).then(response => {

          var data = response.data

          if (data.length == 0) {
            this._snackBar.open('No Appointments', "Close", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          }
          else {
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          formDirective.resetForm();
          this.searchForm.reset();
        })
          .catch(error => {
            this._snackBar.open('No Appointments', "Close", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          });

      }
      else if (this.searchForm.value.appointmentDate === null && this.searchForm.value.branch !== null) {

        this.appointmentService.getAppintmentsBranch(this.searchForm.value.branch).then(response => {

          var data = response.data

          if (data.length == 0) {
            this._snackBar.open('No Appointments', "Close", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          }
          else {
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          formDirective.resetForm();
          this.searchForm.reset();
        })
          .catch(error => {
            this._snackBar.open('No Appointments', "Close", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          });
      }
      else {
        let newDate = new Date(this.searchForm.value.appointmentDate);
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let date = newDate.getDate();

        var mm = String(month)
        var dd = String(date)
        if (month < 10) {
          mm = "0" + month;
        }
        if (date < 10) {
          dd = "0" + date;
        }
        var finalDate = `${year}-${mm}-${dd}`

        this.appointmentService.getAllAppintments(finalDate, this.searchForm.value.branch).then(response => {

          var data = response.data

          if (data.length == 0) {
            this._snackBar.open('No Appointments', "Close", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          }
          else {
            this.dataSource = new MatTableDataSource(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }

          formDirective.resetForm();
          this.searchForm.reset();
        })
          .catch(error => {
            this._snackBar.open('No Appointments', "Close", {
              duration: 4000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              panelClass: ['red-snackbar'],
            });
          });
      }
    }
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

}

export interface AppointmentData {
  appintmentId: number;
  name: string;
  nic: string;
  mobileNo: string;
  reason: string;
  appDate: string;
  pdBranchName: string;
  pdBranchId: number,
  slot: string,
  slotId: number,
  state: number,
  penno: number
}
