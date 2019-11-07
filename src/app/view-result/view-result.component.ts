import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-view-result',
    templateUrl: './view-result.component.html',
    styleUrls: ['./view-result.component.scss'],
})
export class ViewResultComponent implements OnInit {
    canvasId: string;
    canvas: any;
    feedback: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.setCanvasId().then(() => {
            this.getCanvas().then(() => {
                console.log('canvas ' + this.canvas);
                this.getFeedbackForCanvasId().then(() => {
                    console.log('feedback ' + this.feedback);
                });
            });
        });
    }

    async setCanvasId() {
        await this.route.paramMap.subscribe(params => {
            this.canvasId = params.get('canvasId');
        });
    }

    async getCanvas() {
        await this.dataService.getCanvas(this.canvasId).then((canvas) => {
            this.canvas = JSON.parse(canvas);
        });
    }

    async getFeedbackForCanvasId() {
        await this.dataService.getFeedbackForCanvasId(this.canvasId).then((feedback) => {
            this.feedback = JSON.parse(feedback);
        });
    }
}
