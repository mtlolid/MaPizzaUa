import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DogovirPublichnoyiOfertyComponent } from "./dogovir-publichnoyi-oferty.component";

const routes: Routes = [
  {
    path: '', component: DogovirPublichnoyiOfertyComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DogovirPublichnoyiOfertyRoutingModule { }
