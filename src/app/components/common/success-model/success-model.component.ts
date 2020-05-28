import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-model',
  templateUrl: './success-model.component.html',
  styleUrls: ['./success-model.component.scss']
})
export class SuccessModelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SuccessModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
