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
    date: any;

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

    downloadJpg() {
        const canvasDataUrl = this.canvas.toDataURL()
        .replace(/^data:image\/[^;]*/, 'data:application/octet-stream'),
        link = document.createElement('a'); // create an anchor tag

        // set parameters for downloading
        link.setAttribute('href', canvasDataUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', this.Id + '.png');

        // compat mode for dispatching click on your anchor
        if (document.createEvent) {
        const evtObj = document.createEvent('MouseEvents');
        evtObj.initEvent('click', true, true);
        link.dispatchEvent(evtObj);
        } else if (link.click) {
        link.click();
        }

    }
}
