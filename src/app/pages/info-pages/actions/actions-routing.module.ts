import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionsComponent } from "./actions.component";
import { ActionInfoComponent } from "./action-info/action-info.component";
import { ActionResolver } from 'src/app/shared/resolvers/action/action.resolver';

const routes: Routes = [
  {
    path: '', component: ActionsComponent
  },
  {
    path: ':id', component: ActionInfoComponent,
    resolve: {
      productInfo: ActionResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
