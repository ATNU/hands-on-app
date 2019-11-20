import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {fabric} from 'fabric';

@Component({
    selector: 'app-view-result',
    templateUrl: './view-result.component.html',
    styleUrls: ['./view-result.component.scss'],
})
export class ViewResultComponent implements OnInit {
    Id: string;
    canvasObject: any;
    canvas: any;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.setCanvasId().then(() => {
            this.getCanvasAndFeedback().then(() => {
                this.displayCanvas();
                });
            });
    }
displayCanvas() {
    this.canvas = new fabric.Canvas('myCanvas');
    this.canvas.loadFromJSON(this.canvasObject.canvasJSON, this.canvas.renderAll.bind(this.canvas), function(o, object) {
        fabric.log(o, object);
    });

}

    async setCanvasId() {
        await this.route.paramMap.subscribe(params => {
            this.Id = params.get('canvasId');
        });
    }

    async getCanvasAndFeedback() {
        await this.dataService.getFeedbackAndCanvas(this.Id).then((canvas) => {
            this.canvasObject = JSON.parse(canvas);
        });
    }

}
