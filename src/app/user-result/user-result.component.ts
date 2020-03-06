import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-result',
  templateUrl: './user-result.component.html',
  styleUrls: ['./user-result.component.scss']
})
export class UserResultComponent implements OnInit {
ID: string;
results: any;
pages: any;
feedbacks: any;

  constructor(
      private dataService: DataService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.getResults().then(() => {
      this.dataService.getUserResults(this.ID).then((result) => {
        this.results = result;
        this.pages = this.results.pages;
        console.log(this.pages);
        this.feedbacks = this.results.feedbacks;
      });
    });
  }

  async getResults() {
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('userID');
    });
  }

  transformDate(dateString) {
    const date = new Date(dateString);
    return date.getHours() + '.' + date.getMinutes() + ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  viewFeedback(ID) {
    this.router.navigate(['/feedbackResult/' + ID]);
  }

  viewPage(ID) {
    this.router.navigate(['/pageResult/' + ID]);
  }
}
