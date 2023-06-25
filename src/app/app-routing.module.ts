import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { LogInPageComponent } from './layouts/log-in-page/log-in-page.component';
import { SignUpPageComponent } from './layouts/sign-up-page/sign-up-page.component';
import { StartPageComponent } from './layouts/start-page/start-page.component';
import { CollectionPageComponent } from './layouts/collection-page/collection-page.component';
import { TrainingComponent } from './layouts/training/training.component';

const routes: Routes = [
  {path: 'home', component: HomePageComponent},
  {path: 'log-in', component: LogInPageComponent},
  {path: 'sign-up', component: SignUpPageComponent},
  {path: 'start', component: StartPageComponent},
  {path: 'collection/:id/:name', component: CollectionPageComponent },
  {path: 'training/:id', component: TrainingComponent},
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
