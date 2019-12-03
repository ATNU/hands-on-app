import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../data.service';


@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {

    complete: boolean;

    q1Check: string;
    q1Text: string;

    q2Check: string;
    q2Text: string;


    q3Check: string;
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
this.complete = true;
    }

    async saveFeedback() {
        this.checkComplete();
        console.log(this.complete);
        if (this.complete) {
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


    checkComplete() {
        if (this.q1Check === undefined || this.q2Check === undefined || this.q3Check === undefined || this.device === undefined || this.job === undefined) {
            this.complete = false;
        } else { this.complete = true; }
}

}
