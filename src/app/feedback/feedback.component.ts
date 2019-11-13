import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import {DataService} from '../data.service';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
feedbackText: string;
canvasId: string;
svg: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.canvasId = params.get('canvasId');
    });
  }

  async saveFeedback() {
    console.log(this.feedbackText + this.canvasId);
    this.dataService.saveFeedback(this.canvasId, this.feedbackText).then(() => this.router.navigate(['/home']));

}

}
