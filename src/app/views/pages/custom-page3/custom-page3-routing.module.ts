import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomPage3Component } from './custom-page3.component';


const routes: Routes = [
  {path:'', component: CustomPage3Component  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomPage3RoutingModule { }
