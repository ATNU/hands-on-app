import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DataService} from "../data.service";

@Component({
  selector: 'app-feedback-result',
  templateUrl: './feedback-result.component.html',
  styleUrls: ['./feedback-result.component.scss']
})
export class FeedbackResultComponent implements OnInit {
ID: string;
feedback: any;

  constructor(
      private route: ActivatedRoute,
      private dataService: DataService
  ) { }

  ngOnInit() {
    this.getFeedbackResult().then(() => {
      this.dataService.getFeedback(this.ID).then((result) => {
        console.log('call feedback' + this.feedback);
        this.feedback = result;
      });

    });
  }

  async getFeedbackResult() {
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('feedbackID');
      console.log(this.ID);
    });
  }

  transformDate(dateString) {
    const date = new Date(dateString);
    return date.getHours() + '.' + date.getMinutes() + ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }
}
