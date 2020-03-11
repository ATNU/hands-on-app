import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewResultComponent } from './view-result/view-result.component';
import { HomeComponent } from './home/home.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './dialog/dialog.component';
import { TextTestComponent } from './text-test/text-test.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { FeedbackSuccessComponent } from './feedback-success/feedback-success.component';

import { CommonModule } from '@angular/common';
import { SummariesComponent } from './summaries/summaries.component';
import { UserResultComponent } from './user-result/user-result.component';
import { FeedbackResultComponent } from './feedback-result/feedback-result.component';
import { PageResultComponent } from './page-result/page-result.component';


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    FeedbackComponent,
    SummariesComponent,
    ViewResultComponent,
    HomeComponent,
    DialogComponent,
    TextTestComponent,
    LoginComponent,
    RegisterComponent,
    FeedbackSuccessComponent,
    UserResultComponent,
    FeedbackResultComponent,
    PageResultComponent
  ],
  entryComponents: [DialogComponent, FeedbackSuccessComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ColorPickerModule,
    NoopAnimationsModule,
    MatDialogModule,
    CommonModule],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
