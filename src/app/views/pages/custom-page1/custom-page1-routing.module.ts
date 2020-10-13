import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomPage1Component } from "./custom-page1.component";

const routes: Routes = [{ path: "", component: CustomPage1Component  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomPage1RoutingModule {}
