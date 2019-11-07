import { Injectable, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public sendSVG(canvasSVG: string) {
    console.log(canvasSVG);
  }

  public sendJSON(canvasJSON: string) {
    console.log(canvasJSON);
  }


}
