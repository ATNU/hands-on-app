import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fabric} from 'fabric';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {DataService} from '../data.service';
import {environment} from '../../environments/environment';
import {TemplateBindingParseResult} from '@angular/compiler';
import {AuthService} from "../auth.service";

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
    pencilTest: any;
    dialogOpen: boolean;
    resObject: any;
    screenWidth;
    screenHeight;
    originalZoom;

    zoomMax = 23;
    SCALE_FACTOR = 1.3;

    constructor(
        private router: Router,
        private dialog: MatDialog,
        private dataService: DataService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {

        console.log('base URL: ' + environment.apiBaseURL);
        this.screenHeight = screen.height;
        this.screenWidth = screen.width;


        this.message = 'Change pen colour';
        this.colour = 'gray';

        // create a canvas and scale to size of background image
        // const canvasBground = document.getElementById('canvas-background');
        // const viewpointWidth = this.screenWidth - 50;
        // const viewpointHeight = this.screenHeight - 50;
        // canvasBground.setAttribute('height', viewpointHeight.toString());
        // canvasBground.setAttribute('width', viewpointWidth.toString());

        // size canvas to fit screen width and stop at bottom of image
        this.canvas = new fabric.Canvas('myCanvas');
        this.canvas.setWidth(this.screenWidth);
        this.canvas.setHeight(this.screenWidth * 1.33);

        // set zoom to display whole page using screen width of ipad page
       this.originalZoom = this.screenWidth / 768;
        this.canvas.setZoom(this.originalZoom);

        this.bgImage = './assets/image8.png';
        this.clear();

        fabric.Image.fromURL(this.bgImage, (oImg) => {
            this.canvas.add(oImg);
            this.canvas.sendToBack(oImg);
            this.canvas.renderAll();
        }, {evented: false, selectable: false, hasBorders: false, hasControls: false, hasRotatingPoint: false});

        this.canvas.renderAll.bind(this.canvas);
        this.openDialog();
        this.pageNo = 0;
        this.dataService.getText().then((response) => {
            this.text = response.contents;
            this.allLines = this.text.split('\\n');
            this.countPages(this.allLines);
            console.log('line count = ' + this.lineCount);
            console.log('page count = ' + this.pageCount);
        });
        this.pencilTest = 'Pencil';
    }

    zoomIn() {
        // if(this.canvas.getZoom().toFixed(5) > this.zoomMax){
        //     console.log("zoomIn: Error: cannot zoom-in anymore");
        //     return;
        // }

        this.canvas.setZoom(this.canvas.getZoom() * this.SCALE_FACTOR);
        this.canvas.setHeight(this.canvas.getHeight() * this.SCALE_FACTOR);
        this.canvas.setWidth(this.canvas.getWidth() * this.SCALE_FACTOR);
        this.canvas.renderAll();
    }

    zoomOut() {
        // if( this.canvas.getZoom().toFixed(5) <=1 ){
        //     console.log("zoomOut: Error: cannot zoom-out anymore");
        //     return;
        // }

        this.canvas.setZoom(this.canvas.getZoom() / this.SCALE_FACTOR);
        this.canvas.setHeight(this.canvas.getHeight() / this.SCALE_FACTOR);
        this.canvas.setWidth(this.canvas.getWidth() / this.SCALE_FACTOR);
        this.canvas.renderAll();
    }

    moveLeft() {
        var units = 10;
        var delta = new fabric.Point(units, 0);
        this.canvas.relativePan(delta);
    }

    moveRight() {
        var units = 10;
        var delta = new fabric.Point(-units, 0);
        this.canvas.relativePan(delta);
    }

    moveDown() {
        var units = 10;
        var delta = new fabric.Point(0, -units);
        this.canvas.relativePan(delta);
    }

    moveUp() {
        var units = 10;
        var delta = new fabric.Point(0, units);
        this.canvas.relativePan(delta);
    }

    async clear() {
        this.canvas.clear();
        // this.canvas.setBackgroundImage(this.bgImage, this.canvas.renderAll.bind(this.canvas));

        this.getPage();
        this.canvas.isDrawingMode = true;

    }

    openDialog() {
        this.dialogOpen = true;
        const dialogConfig = new MatDialogConfig();

        dialogConfig.autoFocus = true;
        dialogConfig.maxWidth = 500;
        dialogConfig.disableClose = false;

        const newDialog = this.dialog.open(DialogComponent, dialogConfig);

        // signal to navbar to be functional after dialog is closed
        newDialog.afterClosed().subscribe(result => {
            this.dialogOpen = false;
        });

    }


    // This is now default on as listed above in clear and oninit
    enableDraw() {
        this.canvas.renderAll.bind(this.canvas);
        this.canvas.isDrawingMode = true;
        this.canvas.freeDrawingBrush = new fabric[this.pencilTest + 'Brush'](this.canvas);
        this.canvas.freeDrawingBrush.width = 5;
        this.canvas.freeDrawingBrush.color = this.colour;
        //   this.canvas.renderAll();
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
        fabric.Image.fromURL(this.bgImage, (oImg) => {
            // oImg.height = this.screenHeight;
            // oImg.width = this.screenWidth;
            this.canvas.add(oImg);
            this.canvas.sendToBack(oImg);
            this.canvas.renderAll();
        }, {evented: false, selectable: false, hasBorders: false, hasControls: false, hasRotatingPoint: false});
        this.clear();

    }

    nextPage() {

        // todo save page to local

        // don't navigate if not logged in
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }

        this.pageNo++;

        if (this.pageNo <= this.pageCount) {
            this.changeBgImg();
            this.getPage();
        } else {
            this.pageNo--;
        }
    }

    prevPage() {
        // todo save page to local

        // don't navigate if not logged in
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
        }

        this.pageNo > 0 ? this.pageNo-- : this.pageNo = 0;
        this.changeBgImg();
        this.getPage();
    }


    feedbackClicked() {
        // localStorage.setItem('svg', this.canvas.toSVG());
        // localStorage.setItem('json', JSON.stringify(this.canvas.toDatalessJSON()));

        // todo save page to local storage with page number as with next page?

        this.router.navigate(['feedback']);
    }

    // set the brush to eraser
    erase() {
        this.canvas.isDrawingMode = true;
        const eraserBrush = new EraserBrush(this.canvas);
        eraserBrush.width = 10;
        eraserBrush.color = "#A59D87";
        this.canvas.freeDrawingBrush = eraserBrush;

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
        if (line1 <= (this.lineCount - 1)) {

            linesList.push(this.allLines[line1].replace('\\r', ''));

            const line2 = line1 + 1;

            // if line 2 is OK, add and move on to get line 3
            if (line2 <= (this.lineCount - 1)) {
                linesList.push(this.allLines[line2].replace('\\r', ''));

                const line3 = line1 + 2;

                // if line 3 is OK, add and move on to get line 4
                if (line3 <= (this.lineCount - 1)) {
                    linesList.push(this.allLines[line3].replace('\\r', ''));

                    const line4 = line1 + 3;

                    // if line 4 is OK, add and move on to get line 5
                    if (line4 <= (this.lineCount - 1)) {
                        linesList.push(this.allLines[line4].replace('\\r', ''));

                        const line5 = line1 + 4;

                        // if line 5 is OK, add
                        if (line5 <= (this.lineCount - 1)) {
                            linesList.push(this.allLines[line5].replace('\\r', ''));
                        }
                    }
                }
            }
        }

        this.pageText = linesList.join('\n\n\n');

        // Generate a fabric text object
        // adjustments for left and right page margins - all in proportion to size of canvas-background image height and screen width
        // if a line of text is too long, reduce the font size until it fits

        const maxWidth = this.screenWidth * 0.9;
        let smallMargin = this.screenWidth * 0.2;
        let largeMargin = this.screenWidth * 0.3;
        let topMargin = this.screenWidth * 1.33 * 0.3;

        // adapt margins for small screens
        if (this.screenWidth < 600) {
            topMargin = this.screenWidth * 1.33 * 0.5;
            smallMargin = this.screenWidth * 0.4;
            largeMargin = this.screenWidth * 0.5;
        }

        const textLines = new fabric.Text(this.pageText, {
            left: this.bgImage === './assets/rightpage.jpg' ? smallMargin : largeMargin,
            top: topMargin,
            fontSize: 22,
            textAlign: 'left'
        });

        if (textLines.width > maxWidth) {

            textLines.fontSize *= maxWidth / (textLines.width + 1);
            textLines.width = this.screenWidth;
        }
        this.canvas.add(textLines);
    }

    // start counting at page 2 because manuscript is page 1
    countPages(listOfLines) {
        let lines = 0;
        listOfLines.forEach(() => {
            lines++;
        });

        // take off last line to remove stray speech mark
        this.lineCount = lines - 1;

        const decimalPageCount = (this.lineCount / 5) + 1;

        // round up to nearest whole page
        this.pageCount = Math.ceil(decimalPageCount) - 1;
    }
}


/*
 * Note: Might not work with versions other than 3.1.0
 *
 * Made it so that the bound is calculated on the original only
 */
const ErasedGroup = fabric.util.createClass(fabric.Group, {
    original: null,
    erasedPath: null,
    initialize(original, erasedPath, options, isAlreadyGrouped) {
        this.original = original;
        this.erasedPath = erasedPath;
        this.callSuper('initialize', [this.original, this.erasedPath], options, isAlreadyGrouped);
    },

    _calcBounds(onlyWidthHeight) {
        const aX = [],
            aY = [],
            props = ['tr', 'br', 'bl', 'tl'],
            jLen = props.length,
            ignoreZoom = true;

        const o = this.original;
        o.setCoords(ignoreZoom);
        for (let j = 0; j < jLen; j++) {
            const prop = props[j];
            aX.push(o.oCoords[prop].x);
            aY.push(o.oCoords[prop].y);
        }

        this._getBounds(aX, aY, onlyWidthHeight);
    },
});

/*
 * Note1: Might not work with versions other than 3.1.0
 *
 * Made it so that the path will be 'merged' with other objects
 *  into a customized group and has a 'destination-out' composition
 */
const EraserBrush = fabric.util.createClass(fabric.PencilBrush, {

    /**
     * On mouseup after drawing the path on contextTop canvas
     * we use the points captured to create an new fabric path object
     * and add it to the fabric canvas.
     */
    _finalizeAndAddPath() {
        let ctx = this.canvas.contextTop;
        ctx.closePath();
        if (this.decimate) {
            this._points = this.decimatePoints(this._points, this.decimate);
        }
        let pathData = this.convertPointsToSVGPath(this._points).join('');
        if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
            // do not create 0 width/height paths, as they are
            // rendered inconsistently across browsers
            // Firefox 4, for example, renders a dot,
            // whereas Chrome 10 renders nothing
            this.canvas.requestRenderAll();
            return;
        }

        // use globalCompositeOperation to 'fake' eraser
        let path = this.createPath(pathData);
        path.globalCompositeOperation = 'destination-out';
        path.selectable = false;
        path.evented = false;
        path.absolutePositioned = true;

        // grab all the objects that intersects with the path
        const objects = this.canvas.getObjects().filter((obj) => {
            // if (obj instanceof fabric.Textbox) return false;
            // if (obj instanceof fabric.IText) return false;
            if (!obj.intersectsWithObject(path)) {
                return false;
            }
            return true;
        });

        if (objects.length > 0) {

            // merge those objects into a group
            const mergedGroup = new fabric.Group(objects);
            const newPath = new ErasedGroup(mergedGroup, path);

            const left = newPath.left;
            const top = newPath.top;

            // convert it into a dataURL, then back to a fabric image
            const newData = newPath.toDataURL({
                withoutTransform: true
            });
            fabric.Image.fromURL(newData, (fabricImage) => {
                fabricImage.set({
                    left,
                    top,
                });

                // remove the old objects then add the new image
                this.canvas.remove(...objects);
                this.canvas.add(fabricImage);
            });
        }

        this.canvas.clearContext(this.canvas.contextTop);
        this.canvas.renderAll();
        this._resetShadow();
    },
});

