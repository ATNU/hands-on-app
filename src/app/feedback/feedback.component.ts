import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
feedbackText: string;
id: string;
saveToFile: string;

  constructor(private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  saveFeedback() {
    console.log(this.feedbackText + this.id);
    this.saveToFile = this.id + ',' + this.feedbackText;

    // save feedback
  }

}
