import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FeedbackComponent} from './feedback/feedback.component';
import {HttpClientModule} from '@angular/common/http';
import {ResultsComponent} from './results/results.component';
import {ViewResultComponent} from './view-result/view-result.component';
import {HomeComponent} from './home/home.component';


// @ts-ignore
@NgModule({
  declarations: [
      AppComponent,
    FeedbackComponent,
      ResultsComponent,
ViewResultComponent,
      HomeComponent
  ],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, NgbModule],
  providers: []  ,
  bootstrap: [AppComponent]
})
export class AppModule {}
