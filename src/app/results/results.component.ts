import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
canvasIDList: any;
allCanvas: any;

  constructor(
      private dataService: DataService,
      private router: Router) { }

  ngOnInit() {
    // get all canvas stored in db
  this.dataService.getAllCanvas().then((canvasList) => {
    this.allCanvas = canvasList;
    console.log(this.allCanvas);
    this.setCanvasIdList();
    console.log(this.canvasIDList);
  });
  }

  setCanvasIdList() {
    const list = [];
    for (const canvas of this.allCanvas) {
      list.push(canvas._id);
    }
    this.canvasIDList = list;
  }

  canvasClicked(canvasID: string) {
    this.router.navigate(['/viewResult/' + canvasID]);
  }

}
