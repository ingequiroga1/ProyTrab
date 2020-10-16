// Angular
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
// Components
import { BaseComponent } from "./views/theme/base/base.component";
// Auth
import { AuthGuard } from "./core/auth";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./views/pages/auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "error",
    loadChildren: () =>
      import("./views/pages/error/error.module").then((m) => m.ErrorModule),
  },
  {
    path: "",
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: () =>
          import("./views/pages/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "community",
        loadChildren: () =>
          import("./views/pages/community/community.module").then(
            (m) => m.CommunityModule
          ),
      },
      {
        path: "page1",
        loadChildren: () =>
          import("./views/pages/custom-page1/custom-page1.module").then(
            (m) => m.CustomPage1Module
          ),
      },
      // {
      //   path: "page2",
      //   loadChildren: () =>
      //     import("./views/pages/custom-page2/custom-page2.module").then(
      //       (m) => m.CustomPage2Module
      //     ),
      // },
      {
        path: 'page2/:id',
         loadChildren: () =>
           import("./views/pages/custom-page2/custom-page2.module").then(
             (m) => m.CustomPage2Module
           ),
      },
      {
        path: 'page3/:id',
        loadChildren: () =>
          import('./views/pages/custom-page3/custom-page3.module').then(
            (m) => m.CustomPage3Module
          ),
      },
      {
        path: "mail",
        loadChildren: () =>
          import("./views/pages/apps/mail/mail.module").then(
            (m) => m.MailModule
          ),
      },
      {
        path: "ecommerce",
        loadChildren: () =>
          import("./views/pages/apps/e-commerce/e-commerce.module").then(
            (m) => m.ECommerceModule
          ),
      },
      {
        path: "ngbootstrap",
        loadChildren: () =>
          import("./views/pages/ngbootstrap/ngbootstrap.module").then(
            (m) => m.NgbootstrapModule
          ),
      },
      {
        path: "material",
        loadChildren: () =>
          import("./views/pages/material/material.module").then(
            (m) => m.MaterialModule
          ),
      },
      {
        path: "user-management",
        loadChildren: () =>
          import("./views/pages/user-management/user-management.module").then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: "wizard",
        loadChildren: () =>
          import("./views/pages/wizard/wizard.module").then(
            (m) => m.WizardModule
          ),
      },
      {
        path: "builder",
        loadChildren: () =>
          import("./views/theme/content/builder/builder.module").then(
            (m) => m.BuilderModule
          ),
      },
      {
        path: "builder",
        loadChildren: () =>
          import("./views/theme/content/builder/builder.module").then(
            (m) => m.BuilderModule
          ),
      },
      {
        path: "point-management",
        loadChildren: () =>
          import('./views/pages/point-management/point-management.module').then(
            (m) => m.PointManagementModule
          ),
      },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "**", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "error/403", pathMatch: "full" },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
