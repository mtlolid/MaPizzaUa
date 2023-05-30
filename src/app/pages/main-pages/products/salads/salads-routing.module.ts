import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaladsComponent } from "./salads.component";

const routes: Routes = [
  {
    path: '', component: SaladsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaladsRoutingModule { }
