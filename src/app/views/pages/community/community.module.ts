import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CommunityRoutingModule } from "./community-routing.module";
import { ListComponent } from "./list/list.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
// Fake API Angular-in-memory
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// Translate Module
import { TranslateModule } from "@ngx-translate/core";
// NGRX
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
// Core => Services
import {
  customersReducer,
  CustomerEffects,
  CustomersService,
  productsReducer,
  ProductEffects,
  ProductsService,
  productRemarksReducer,
  ProductRemarkEffects,
  ProductRemarksService,
  productSpecificationsReducer,
  ProductSpecificationEffects,
  ProductSpecificationsService,
} from "../../../core/e-commerce";
// Core => Utils
import {
  HttpUtilsService,
  TypesUtilsService,
  InterceptService,
  LayoutUtilsService,
} from "../../../core/_base/crud";
// Shared

import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from "@angular/material/dialog";
import { MatTabsModule } from "@angular/material/tabs";
import { MatNativeDateModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { environment } from "../../../../environments/environment";
import {
  NgbProgressbarModule,
  NgbProgressbarConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxPermissionsModule } from "ngx-permissions";
import { FakeApiService } from "../../../core/_base/layout";
import { PartialsModule } from '../../partials/partials.module';
// Core
// Auth
@NgModule({
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule,
    NgxPermissionsModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTooltipModule,
    NgbProgressbarModule,
    CommonModule,
    CommunityRoutingModule,
    PartialsModule,
    environment.isMockEnabled
      ? HttpClientInMemoryWebApiModule.forFeature(FakeApiService, {
          passThruUnknownUrl: true,
          dataEncapsulation: false,
        })
      : [],
    StoreModule.forFeature("products", productsReducer),
    EffectsModule.forFeature([ProductEffects]),
    StoreModule.forFeature("customers", customersReducer),
    EffectsModule.forFeature([CustomerEffects]),
    StoreModule.forFeature("productRemarks", productRemarksReducer),
    EffectsModule.forFeature([ProductRemarkEffects]),
    StoreModule.forFeature(
      "productSpecifications",
      productSpecificationsReducer
    ),
    EffectsModule.forFeature([ProductSpecificationEffects]),
  ],
  providers: [
    InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true,
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        panelClass: "mat-dialog-container-wrapper",
        height: "auto",
        width: "900px",
      },
    },
    TypesUtilsService,
    LayoutUtilsService,
    HttpUtilsService,
    CustomersService,
    ProductRemarksService,
    ProductSpecificationsService,
    ProductsService,
    TypesUtilsService,
    LayoutUtilsService,
  ],

  declarations: [ListComponent],
})
export class CommunityModule {}