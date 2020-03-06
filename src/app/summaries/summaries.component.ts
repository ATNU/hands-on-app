import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summaries',
  templateUrl: './summaries.component.html',
  styleUrls: ['./summaries.component.scss']
})
export class SummariesComponent implements OnInit {
summaries: any;

  constructor(
      private dataService: DataService,
      private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getUserSummaries().then((summariesObject) => {
      this.summaries = summariesObject.summaries;
    });
  }

  viewUser(ID: string) {
    this.router.navigate(['/userResult/' + ID]);
  }
}
