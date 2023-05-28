import { Component } from '@angular/core';
import { INewsRequest } from 'src/app/shared/interfaces/news/news.interface';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {

  public newsArray!: Array<INewsRequest>;

  constructor(
    private newsService: NewsService,
  ) { };

  ngOnInit(): void {
    this.getNews()
  }

  getNews(): void {
    this.newsService.getAllFirebase().subscribe(
      data => { this.newsArray = data as INewsRequest[] }
    )
  };

}
