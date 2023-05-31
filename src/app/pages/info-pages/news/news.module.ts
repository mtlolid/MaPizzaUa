import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from "../../../shared/modules/shared.module";
import { NewsInfoComponent } from "./news-info/news-info.component";
import { NewsComponent } from "./news.component";
import { NewsRoutingModule } from "./news-routing.module";



@NgModule({
  declarations: [
    NewsComponent,
    NewsInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsRoutingModule
  ]
})
export class NewsModule { }
