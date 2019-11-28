import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fabric} from 'fabric';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss'],
})
export class HomeComponent implements OnInit {
    canvas: any;
    state: boolean;
    colour: string;
    message: string;
    canvasID: string;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.message = 'Change pen colour';
        this.colour = 'gray';
        this.canvas = new fabric.Canvas('myCanvas');
        this.clear();
        this.canvas.renderAll.bind(this.canvas);
    }

    async clear() {
        this.canvas.clear();
        /*
        scales background image to the size of the div, but it doesn't load correctly, only when you attempt to draw
        const canvasHeight = this.canvas.height;
         const canvasWidth = this.canvas.width;
         const bgImg = new fabric.Image();
         bgImg.setSrc('./assets/image.png', function() {
             bgImg.set({
                 scaleX: canvasWidth / bgImg.width,
                 scaleY: canvasHeight / bgImg.height
             });

         });
     
         this.canvas.setBackgroundImage(bgImg, this.canvas.renderAll.bind(this.canvas));
         this.canvas.isDrawingMode = true;*/
        this.canvas.setBackgroundImage('./assets/image5.png', this.canvas.renderAll.bind(this.canvas));
        this.canvas.isDrawingMode = true;
    }

    // This is now default on as listed above in clear and oninit
    enableDraw() {
        this.canvas.isDrawingMode = true;
    }


    changeColour(colour: string) {
        this.canvas.freeDrawingBrush.color = colour;
    }

    increaseWidth() {
        this.canvas.freeDrawingBrush.width++;
    }

    decreaseWidth() {
        if (this.canvas.freeDrawingBrush.width > 1) {
            this.canvas.freeDrawingBrush.width--;
        }
    }


    feedbackClicked() {
        localStorage.setItem('svg', this.canvas.toSVG());
        localStorage.setItem('json', JSON.stringify(this.canvas.toDatalessJSON()));

        this.router.navigate(['feedback/' + this.canvasID]);
    }

    downLoadJpg() {
        const canvasDataUrl = this.canvas.toDataURL()
                .replace(/^data:image\/[^;]*/, 'data:application/octet-stream'),
            link = document.createElement('a'); // create an anchor tag

        // set parameters for downloading
        link.setAttribute('href', canvasDataUrl);
        link.setAttribute('target', '_blank');
        link.setAttribute('download', 'test5.png');

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
