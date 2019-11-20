import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
feedbackText: string;
svg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {

  }

  async saveFeedback() {
    console.log(this.feedbackText);
    this.dataService.saveFeedback(this.feedbackText).then(() => this.router.navigate(['/home']));

}

}
