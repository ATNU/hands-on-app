import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";


@Component({
  selector: 'app-text-test',
  templateUrl: './text-test.component.html',
  styleUrls: ['./text-test.component.scss']
})
export class TextTestComponent implements OnInit {
text;
pageText;
pageRequested;

  constructor(
      private dataService: DataService
  ) { }

  ngOnInit() {
 this.dataService.getText().then((text) => {
   this.text = text;
 });
  }

getPage() {

    console.log(this.pageRequested);
    const pageNo = Number(this.pageRequested);
    console.log(pageNo);

    // split text into array of lines
    const allLines = this.text.split('\\r\\n');

// use page number to work out what lines are needed
const line1 = (pageNo - 2) * 4;
const line2 = line1 + 1;
const line3 = line1 + 2;
const line4 = line1 + 3;

console.log(line1);

// add requested lines to new list
const linesList = [];
linesList.push(allLines[line1]);
linesList.push(allLines[line2]);
linesList.push(allLines[line3]);
linesList.push(allLines[line4]);

console.log(linesList);

this.pageText = linesList;
    }






}
