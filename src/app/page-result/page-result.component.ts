import { Component, OnInit } from '@angular/core';
import {fabric} from 'fabric';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.scss']
})
export class PageResultComponent implements OnInit {
ID: string;
canvas: any;
page: any;
json: any;
pageNo;
bgImage;

  constructor(
      private dataService: DataService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.canvas = new fabric.Canvas('myCanvas');
    this.getPageResult();
  }


getPageResult() {
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('pageID');
      this.dataService.getPage(this.ID).then((result) => {
        this.page = result;
        this.json = result.json;
        this.pageNo = result.pageNo++;
        console.log(result);
        this.displayCanvas(result.json);
      });
  });
  }

  displayCanvas(pageDataToLoad) {
    this.changeBgImg();
    this.canvas.loadFromJSON(pageDataToLoad, this.canvas.renderAll.bind(this.canvas), function (o, object) {
      fabric.log(o, object);
    });
  }

  changeBgImg() {
    if (this.pageNo === 0) {
      this.bgImage = './assets/image8.png';
    } else if (this.pageNo % 2 === 0) {
      // page even
      this.bgImage = './assets/rightpage.jpg';
    } else {
      // page odd
      this.bgImage = './assets/leftpage.jpg';
    }
  }

  transformDate(dateString) {
    const date = new Date(dateString);

    // if minutes is less than 10 add 0 before it
    const mins = date.getMinutes();
    let strMins = mins.toString();
    if (mins < 10) {
      strMins = '0' + strMins;
    }

    return date.getHours() + '.' + strMins + ' ' + date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
  }

  downloadJpg() {
    const canvasDataUrl = this.canvas.toDataURL()
            .replace(/^data:image\/[^;]*/, 'data:application/octet-stream'),
        link = document.createElement('a'); // create an anchor tag

    // set parameters for downloading
    link.setAttribute('href', canvasDataUrl);
    link.setAttribute('target', '_blank');
    link.setAttribute('download', this.ID + '.png');

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
