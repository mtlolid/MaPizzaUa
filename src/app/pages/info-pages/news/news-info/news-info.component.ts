import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.scss']
})
export class NewsInfoComponent {

  public currentNews !: Data;

  constructor(
    private newsService: NewsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getNews()
  }

  getNews(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.newsService.getOneFirebase(id).subscribe(data => {
      this.currentNews = data;
    })

  }

}
