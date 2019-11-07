import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
allCanvas: any;

  constructor(
      private dataService: DataService,
      private router: Router) { }

  ngOnInit() {
    // get all canvas stored in db
  this.dataService.getAllCanvas().then((canvasList) => {
    this.allCanvas = canvasList;
    console.log(this.allCanvas);
  });
  }


  canvasClicked(canvasID: string) {
    this.router.navigate(['/admin/viewResult/' + canvasID]);
  }

}
