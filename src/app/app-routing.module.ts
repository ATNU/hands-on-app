import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FeedbackComponent} from './feedback/feedback.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {SummariesComponent} from './summaries/summaries.component';
import {UserResultComponent} from './user-result/user-result.component';
import {FeedbackResultComponent} from './feedback-result/feedback-result.component';
import {PageResultComponent} from './page-result/page-result.component';
import {  AuthGuardService as AuthGuard} from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: SummariesComponent},
  {path: 'userResult/:userID' , component: UserResultComponent},
  {path: 'feedbackResult/:feedbackID' , component: FeedbackResultComponent},
  {path: 'pageResult/:pageID' , component: PageResultComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
