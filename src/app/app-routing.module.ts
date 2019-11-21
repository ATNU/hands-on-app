import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {FeedbackComponent} from './feedback/feedback.component';
import {ResultsComponent} from './results/results.component';
import {ViewResultComponent} from './view-result/view-result.component';
import {HomePage} from './home/home.page';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  {path: 'feedback/:canvasId', component: FeedbackComponent},
  {path: 'admin', component: ResultsComponent},
  {path: 'admin/viewResult/:canvasId' , component: ViewResultComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
