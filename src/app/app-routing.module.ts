import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component'
import { AppointmentComponent } from './components/appointment/appointment.component'

const routes: Routes = [
  // {
  //   path: '',
  //   component: AppointmentComponent
  // },
  {
    path: '',
    component: HomeComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
