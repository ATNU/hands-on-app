import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UUID } from 'angular2-uuid';
// import { Screenshot } from '@ionic-native/screenshot/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  uniqueID: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.uniqueID = UUID.UUID();
    console.log(this.uniqueID);
  }

  feedbackClicked() {
    // this.saveScreenshot();
    this.router.navigate(['/feedback/' + this.uniqueID]);
  }

  // saveScreenshot() {
  //   this.screenshot.save('jpg', 80, this.uniqueID).then();
  // }
}
