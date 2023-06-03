import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../shared/modules/shared.module";
import { FavouriteComponent } from "./favourite.component";
import { FavouriteRoutingModule } from "./favourite-routing.module";



@NgModule({
  declarations: [
    FavouriteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FavouriteRoutingModule
  ]
})
export class FavouriteModule { }
