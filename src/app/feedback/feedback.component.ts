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
   q1CheckValid: boolean;
   q2CheckValid: boolean;
   q3CheckValid: boolean;
   deviceValid: boolean;
   deviceOtherValid;
   jobValid: boolean;
   jobOtherValid;
   submitted : boolean;

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
        this.submitted = true;
        console.log('submitted');
        this.checkComplete();
        console.log('complete ' + this.complete);
        if (this.complete) {
console.log('comeplted');
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
                createdAt: this.date,
            };
            console.log(feedbackObject);

            this.dataService.saveFeedback(feedbackObject).then(() => this.router.navigate(['home']));
        }
    }

    setJob(jobTitle) {
        this.job = jobTitle;
    }

    checkComplete() {

        // reset complete to true (only changes if required fields are missing)
        this.complete = true;

        // check each field
        if (this.q1Check === undefined) {
            this.q1CheckValid = false;
            this.complete = false;
        } else {
            this.q1CheckValid = true;
        }
        if (this.q2Check === undefined) {
            this.q2CheckValid = false;
            this.complete = false;
        } else {
            this.q2CheckValid = true;
        }
        if (this.q3Check === undefined) {
            this.q3CheckValid = false;
            this.complete = false;
        } else {
            this.q3CheckValid = true;
        }
        if (this.device === undefined) {
            this.deviceValid = false;
            this.complete = false;
        } else {
            this.deviceValid = true;
        }
        if (this.job === undefined) {
            this.jobValid = false;
            this.complete = false;
        } else {
            this.jobValid = true;
        }
        // if other is selected for final questions, check text has been entered.
        if (this.device === 'Other' && this.deviceText === undefined) {
            this.deviceOtherValid = false;
        } else {
            this.deviceOtherValid = true;
        }
        if (this.job === 'Other' && this.jobText === undefined) {
            this.jobOtherValid = false;
        } else {
            this.jobOtherValid = true;
        }

}

}
