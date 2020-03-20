import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FeedbackComponent} from './feedback/feedback.component';
import {ViewResultComponent} from './view-result/view-result.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {TextTestComponent} from './text-test/text-test.component';
import {SummariesComponent} from './summaries/summaries.component';
import {UserResultComponent} from './user-result/user-result.component';
import {FeedbackResultComponent} from './feedback-result/feedback-result.component';
import {PageResultComponent} from './page-result/page-result.component';
import {RouteGuardService} from "./route-guard.service";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuardService] },
  {path: 'feedback', component: FeedbackComponent, canActivate: [RouteGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: SummariesComponent},
  {path: 'userResult/:userID' , component: UserResultComponent},
  {path: 'text', component: TextTestComponent},
  {path: 'feedbackResult/:feedbackID' , component: FeedbackResultComponent},
  {path: 'pageResult/:pageID' , component: PageResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
