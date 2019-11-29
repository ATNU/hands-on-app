import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';


@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {

    q1Choice: string;
    q1Check: boolean;
    q1Text: string;

    q2Choice: string;
    q2Check: boolean;
    q2Text: string;

    q3Choice: string;
    q3Check: boolean;
    q3Text: string;

    device: string;
    deviceText: string;

    job: string;
    jobText: string;

    date: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private dataService: DataService) {
    }

    ngOnInit() {

    }

    async saveFeedback() {


        if (this.q1Choice === 'true') {
            this.q1Check = true;
        } else if (this.q1Choice === 'false') {
            this.q1Check = false;
        }

        if (this.q2Choice === 'true') {
            this.q2Check = true;
        } else if (this.q2Choice === 'false') {
            this.q2Check = false;
        }

        if (this.q3Choice === 'true') {
            this.q3Check = true;
        } else if (this.q3Choice === 'false') {
            this.q3Check = false;
        }

        this.date = new Date(Date.now()).toUTCString();
        console.log(this.date);
// create feedback
        const canvasSVGString = localStorage.getItem('svg');
        const canvasJSONString = localStorage.getItem('json');
        localStorage.removeItem('svg');
        localStorage.removeItem('json');

        const feedbackObject = {
            q1Check: this.q1Check,
            q1Text: this.q1Text,
            q2Check: this.q2Check,
            q2Text: this.q2Text,
            q3Check: this.q3Check,
            q3Text: this.q3Text,
            job: this.job,
            jobText: this.jobText,
            device: this.device,
            deviceText: this.deviceText,
            canvasSVG: canvasSVGString,
            canvasJSON: canvasJSONString,
            createdAt: this.date,
        };
console.log(feedbackObject);

        this.dataService.saveFeedback(feedbackObject).then(() => this.router.navigate(['home']));

    }

}
