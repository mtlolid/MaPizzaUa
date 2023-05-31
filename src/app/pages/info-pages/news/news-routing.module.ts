import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from "./news.component";
import { NewsInfoComponent } from "./news-info/news-info.component";

const routes: Routes = [
  {
    path: '', component: NewsComponent
  },
  {
    path: ':id',
    component: NewsInfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
