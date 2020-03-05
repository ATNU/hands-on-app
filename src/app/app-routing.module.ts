import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FeedbackComponent} from './feedback/feedback.component';
import {ResultsComponent} from './results/results.component';
import {ViewResultComponent} from './view-result/view-result.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'feedback/:canvasId', component: FeedbackComponent},
  {path: 'admin', component: ResultsComponent},
  {path: 'admin/viewResult/:canvasId' , component: ViewResultComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
