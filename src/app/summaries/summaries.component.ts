import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';
import { Parser } from 'json2csv';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit {
summaries: any;
allFeedbacks: any;
feedbacksWithProcessedTime: any;

  constructor(
      private dataService: DataService,
      private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getUserSummaries().then((summariesObject) => {
      this.summaries = summariesObject.summaries;
      console.log(this.summaries);
      this.dataService.getAllFeedbacks().then((results) => {
this.allFeedbacks = results;
this.processTimes();
      });
    });
  }

  // put timestamps in nicer format for download
    processTimes() {
      this.feedbacksWithProcessedTime = this.allFeedbacks;
      for (const fb of this.feedbacksWithProcessedTime) {
          const time = fb.timestamp;
          const date = new Date(time);

          // if minutes is less than 10 add 0 before it
          const mins = date.getMinutes();
          let strMins = mins.toString();
          if (mins < 10) {
              strMins = '0' + strMins;
          }

          fb.timestamp = date.getHours() + '.' + strMins + ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
      }
    }

  viewUser(ID: string) {
    this.router.navigate(['/userResult/' + ID]);
  }

downloadFeedbackCSV() {
    const fields = ['_id', 'userId', 'q1Check', 'q1Text', 'q2Check', 'q2Text', 'q3Check', 'q3Text', 'job', 'jobText', 'device', 'deviceText', 'timestamp'];
    const opts = {fields};

    try {
        const parser = new Parser(opts);
        const csv = parser.parse(this.allFeedbacks);

        const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
        const now = Date.now();
        saveAs(blob, now + 'feedbacks.csv');

    } catch (err) {
        console.error(err);
    }
}
downloadSummaryCSV() {
    const fields = ['id', 'furthestPage', 'pages', 'feedbacks'];
    const opts = { fields };

    try {
        const parser = new Parser(opts);
        const csv = parser.parse(this.summaries);

        const blob = new Blob([csv], {type: 'text/plain;charset=utf-8'});
        const now = Date.now();
        saveAs(blob, now + 'summaryData.csv');

    } catch (err) {
        console.error(err);
    }
    }




}
