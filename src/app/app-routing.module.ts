import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FeedbackComponent} from './feedback/feedback.component';
import {ViewResultComponent} from './view-result/view-result.component';
import {HomeComponent} from './home/home.component';
import {TextTestComponent} from './text-test/text-test.component';
import {SummariesComponent} from './summaries/summaries.component';
import {UserResultComponent} from './user-result/user-result.component';
import {FeedbackResultComponent} from './feedback-result/feedback-result.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'feedback/:canvasId', component: FeedbackComponent},
  {path: 'admin', component: SummariesComponent},
  {path: 'userResult/:userID' , component: UserResultComponent},
  {path: 'text', component: TextTestComponent},
  {path: 'feedbackResult/:feedbackID' , component: FeedbackResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
