import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { fabric} from 'fabric';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  canvas: any;
  state: boolean;
  screen: any;

  canvasID: string;

  constructor(
      private service: StorageService,
      private router: Router,
      private platform: Platform) {}

  ngOnInit(): void {
    // temporary assign canvasID for testing
    this.canvasID = '5dc3f9bd77e2961090c579f6';

    this.canvas = new fabric.Canvas('myCanvas');
 //   this.canvas.setBackgroundImage('./assets/image.png', this.canvas.renderAll.bind(this.canvas));


    console.log(this.canvas.width);
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
    this.canvas.setBackgroundImage('./assets/image4.png', this.canvas.renderAll.bind(this.canvas));
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
    this.canvas.freeDrawingBrush.width ++;
  }

  decreaseWidth() {
    if (this.canvas.freeDrawingBrush.width > 1) {
      this.canvas.freeDrawingBrush.width --;
    }
  }

  feedbackClicked() {

   this.saveSvg();
  }


realFeedbackClicked() {
    // todo save image and save canvasID returned

    this.router.navigate(['/feedback/' + this.canvasID]);
}

  saveSvg() {
    const toSVG = this.canvas.toSVG();
    this.service.sendSVG(toSVG);
  }

  saveJson() {
    let json_data = JSON.stringify(this.canvas.toDatalessJSON());
    this.service.sendJSON(json_data);
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

  resetClicked() {

    this.saveJson();
  }

}
