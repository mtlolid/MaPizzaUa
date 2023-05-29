import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActionsRequest } from 'src/app/shared/interfaces/actions/actions.interface';
import { INewsPost, INewsRequest } from 'src/app/shared/interfaces/news/news.interface';
import { FilesService } from 'src/app/shared/services/files/files.service';
import { NewsService } from 'src/app/shared/services/news/news.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.scss']
})
export class AdminNewsComponent {

  public addCheck = false;

  public newsForm!: FormGroup;

  public fileUploaded = false;
  public actionPosted = false;

  public editStatus = false;
  private curentEditId!: string;

  public newsArray!: Array<INewsRequest>;

  constructor(
    private fb: FormBuilder,
    private newsService: NewsService,
    private filesService: FilesService
  ) { };

  ngOnInit(): void {
    this.initNewsForm();
    this.getNews();
  }

  addCheckToggle(): void {
    this.addCheck = !this.addCheck;
    this.fileUploaded = false;
    this.editStatus = false;
    this.newsForm.reset();
  }

  initNewsForm(): void {
    this.newsForm = this.fb.group({
      header: [null, Validators.required],
      text: [null, Validators.required],
      file: [null, Validators.required],
      fileHiden: [null, Validators.required]
    })
  };

  // Підгрузка новин

  getNews(): void {
    this.newsService.getAllFirebase().subscribe(
      data => { this.newsArray = data as INewsRequest[] }
    )
  };

  // Створення і редагування

  createNews(): void {
    if (!this.editStatus) {
      const action: INewsPost = {
        header: this.newsForm.value.header,
        text: this.newsForm.value.text,
        file: this.newsForm.value.fileHiden,
      }

      this.newsService.createFirebase(action).then(
        () => {
          this.getNews()
          this.actionPosted = true;
        })

    }

    else {

      const news: INewsRequest = {
        id: this.curentEditId,
        header: this.newsForm.value.header,
        text: this.newsForm.value.text,
        file: this.newsForm.value.fileHiden,
      }

      this.newsService.updateFirebase(news, this.curentEditId).then(
        () => {
          this.getNews()
          this.actionPosted = true;
        }
      )
    }

    this.newsForm.reset();
    this.addCheckToggle();

  };

  // Видалення акції

  deleteNews(id: string): void {
    this.newsService.deleteFirebase(id).then(() => this.getNews())
  };

  // Редагування

  editNews(news: IActionsRequest): void {

    this.newsForm.patchValue({
      header: news.header,
      text: news.text,
      hidenFile: news.file
    })
    this.editStatus = true;
    this.curentEditId = news.id;
    this.addCheck = true;
  };

  // Підгрузка фото

  upload(event: any): void {
    const file = event.target.files[0];
    this.filesService.uploadFile('images/newsImages', file.name, file)
      .then(data => {
        this.newsForm.patchValue({
          fileHiden: data
        });
        this.fileUploaded = true
      })
      .catch(err => {
        console.log(err)
      })
  };

}
