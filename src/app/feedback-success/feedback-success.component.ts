import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-feedback-success',
  templateUrl: './feedback-success.component.html',
  styleUrls: ['./feedback-success.component.scss']
})
export class FeedbackSuccessComponent implements OnInit {

  constructor(
      private dialogRef: MatDialogRef<FeedbackSuccessComponent>
  ) { }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
}
