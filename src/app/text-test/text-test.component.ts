import {Component, OnInit} from '@angular/core';
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
    ) {
    }

    ngOnInit() {
        this.dataService.getText().then((text) => {
            this.text = text;
        });
    }

    // This assumes that page 1 is the manuscript page so the first page actually generated using this method should be page 2.
    // It returns a list of lines (e.g. lines[0] is the first line to display on the page.
    // In this version the page number is submitted (as a string) by the user, in the final version this method will be called on page turn.
    getPage() {


        const pageNo = Number(this.pageRequested);

        // split text into array of lines
        const allLines = this.text.split('\\r\\n');

// use page number to work out what lines are needed
        const line1 = (pageNo - 2) * 4;
        const line2 = line1 + 1;
        const line3 = line1 + 2;
        const line4 = line1 + 3;

// add requested lines to new list
        const linesList = [];
        linesList.push(allLines[line1]);
        linesList.push(allLines[line2]);
        linesList.push(allLines[line3]);
        linesList.push(allLines[line4]);


        this.pageText = linesList;
    }


}
