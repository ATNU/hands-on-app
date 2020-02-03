import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fabric } from 'fabric';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { DataService } from '../data.service';
import {forEach} from "@angular-devkit/schematics";

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
    bgImage: string;
    pageNo: number;
    text: string;
    pageText;
    allLines: string[];
    pageCount: number;
    lineCount: number;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private dataService: DataService
    ) {
    }

    ngOnInit(): void {
        this.message = 'Change pen colour';
        this.colour = 'gray';
        this.canvas = new fabric.Canvas('myCanvas');
        this.bgImage = './assets/image8.png';
        this.clear();
        this.canvas.renderAll.bind(this.canvas);
        this.openDialog();
        this.pageNo = 222 ;
        this.dataService.getText().then((text) => {
            this.text = text;
            this.allLines = this.text.split('\\n');
            this.countPages(this.allLines);
            console.log('line count = ' + this.lineCount);
            console.log('page count = ' + this.pageCount);
        });
    }

    async clear() {
        this.canvas.clear();
        this.canvas.setBackgroundImage(this.bgImage, this.canvas.renderAll.bind(this.canvas));
        this.canvas.isDrawingMode = true;
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

    }

    openDialog() {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = 500;

        this.dialog.open(DialogComponent, dialogConfig);
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
        this.clear();

    }

    nextPage() {
        // needs to handle the last page of the book.
        this.pageNo++;
        this.changeBgImg();
        this.getPage();
    }

    prevPage() {
        this.pageNo > 0 ? this.pageNo-- : this.pageNo = 0;
        this.changeBgImg();
        this.getPage();
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

        // This assumes that page 1 is the manuscript page so the first page actually generated using this method should be page 2.
        // It returns a list of lines (e.g. lines[0] is the first line to display on the page.
        getPage() {
            console.log('get page page no');
            console.log(this.pageNo);

            // use page number to work out what lines are needed, then, if they are less than total number of lines, add them to a list of lines for the requested page
            // after removing '/r'
            
            const linesList = [];

            const line1 = (this.pageNo - 1) * 5;
            
            // if line1 is OK, add and move on to get line 2
            if (line1 <= this.lineCount) {
                linesList.push(this.allLines[line1].replace('\\r', ''));

                const line2 = line1 + 1;
                
                // if line 2 is OK, add and move on to get line 3
                if (line2 <= this.lineCount) {
                    linesList.push(this.allLines[line2].replace('\\r', ''));
                   
                    const line3 = line1 + 2;

                    // if line 3 is OK, add and move on to get line 4
                    if (line3 <= this.lineCount) {
                        linesList.push(this.allLines[line3].replace('\\r', ''));

                        const line4 = line1 + 3;

                        // if line 4 is OK, add and move on to get line 5
                        if (line4 <= this.lineCount) {
                            linesList.push(this.allLines[line4].replace('\\r', ''));

                            const line5 = line1 + 4;

                            // if line 5 is OK, add
                            if (line5 <= this.lineCount) {
                                linesList.push(this.allLines[line5].replace('\\r', ''));
                            }
                        }
                    }
                }
            }

            this.pageText = linesList.join('\n\n\n');

            // Generate a fabric text object
            // adjustments for left and right page margins
            // if a line of text is too long, reduce the font size until it fits
            const maxWidth = 500;
            const textLines = new fabric.Text(this.pageText, {
                left: this.bgImage === './assets/rightpage.jpg' ? 50 : 100,
                top: 250,
                fontSize: 22,
                textAlign: 'left'
              });

            if (textLines.width > maxWidth) {
                textLines.fontSize *= maxWidth / (textLines.width + 1);
                textLines.width = maxWidth;
            }
            this.canvas.add(textLines);
    }

    // start counting at page 2 because manuscript is page 1
    countPages(listOfLines) {
       let lines = 0;
       listOfLines.forEach(() => {
            lines++;
        });
       this.lineCount = lines;

       const decimalPageCount = (lines / 5) + 1;

       // round up to nearest whole page
       this.pageCount = Math.ceil(decimalPageCount);
    }
}
