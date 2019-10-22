import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { Screenshot } from '@ionic-native/screenshot/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  uniqueID: string;
  state: boolean;
  screen: any;

  constructor(
      private router: Router,
      @Inject(Screenshot) private screenshot: Screenshot,
      private platform: Platform) {}

  ngOnInit(): void {

  }

  feedbackClicked() {
    this.saveScreenShot().then( () => this.router.navigate(['/feedback/' + this.uniqueID]));
  }

  screenshotCounter() {
    const self = this;
    setTimeout(() => {
      self.state = false;
    }, 1000);
  }

  async saveScreenShot() {
    this.uniqueID = UUID.UUID();
    console.log(this.uniqueID);
    await this.screenshot.save('jpg', 80, this.uniqueID).then(res => {
    this.screen = res.filePath;
    this.state = true;
    console.log(this.screen);
    console.log(this.state);
    this.screenshotCounter();
    return this.uniqueID;
  });
}

  resetClicked() {
    // save screenshot
    this.saveScreenShot().then( () => this.router.navigate(['/home']));
  }

}
