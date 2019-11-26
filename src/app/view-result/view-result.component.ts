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
        this.canvas = new fabric.Canvas('viewCanvas');
        this.canvas.renderAll.bind(this.canvas);
        this.getCanvasAndFeedback();

    }

    displayCanvas() {

        fabric.loadSVGFromString(this.canvasObject.canvasSVG, (objects, options) => {

        const obj = fabric.util.groupSVGElements(objects, options);
        this.canvas.add(obj);
        this.canvas.renderAll.bind(this.canvas);
        this.canvas.isDrawingMode = true;

        });
    }

    async getCanvasAndFeedback() {

        this.route.paramMap.subscribe(params => {
            this.Id = params.get('canvasId');
            this.dataService.getFeedbackAndCanvas(this.Id).then((canvas) => {
                this.canvasObject = JSON.parse(canvas);
                this.displayCanvas();
            });
        });

    /* preserve original server calls
        async setCanvasId() {
            await this.route.paramMap.subscribe(params => {
                this.Id = params.get('canvasId');
            });
        }

        async getCanvasAndFeedback() {
            await this.dataService.getFeedbackAndCanvas(this.Id).then((canvas) => {
                this.canvasObject = JSON.parse(canvas);
                console.log(canvas);
                console.log(this.canvasObject);
            });
        }
        */
        }
}
