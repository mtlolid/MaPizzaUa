import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoriesPost, ICategoriesRequest } from 'src/app/shared/interfaces/categories/categories.interface';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { FilesService } from 'src/app/shared/services/files/files.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent {

  public addCheck = false;

  public categoriesForm!: FormGroup;

  public fileUploaded = false;
  public categoryPosted = false;

  public editStatus = false;
  private curentEditId!: string;

  public categoriesArray!: Array<ICategoriesRequest>;

  constructor(
    private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private filesService: FilesService
  ) { };

  
  ngOnInit(): void {
    this.initCategoriesForm();
    this.getCategories();
  }

  addCheckToggle(): void {
    this.addCheck = !this.addCheck;
    this.fileUploaded = false;
    this.editStatus = false;
    this.categoriesForm.reset();
  }

  initCategoriesForm(): void {
    this.categoriesForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      file: [null, Validators.required],
      fileHiden: [null, Validators.required]
    })
  };

  // Підгрузка акцій

  getCategories(): void {
    this.categoriesService.getAllFirebase().subscribe(
      data => { this.categoriesArray = data as ICategoriesRequest[] }
    )
  };

  // Створення і редагування акцій

  createCategory(): void {
    if (!this.editStatus) {
      const category: ICategoriesPost = {
        name: this.categoriesForm.value.name,
        path: this.categoriesForm.value.path,
        file: this.categoriesForm.value.fileHiden,
      }

      this.categoriesService.createFirebase(category).then(
        () => {
          this.getCategories()
          this.categoryPosted = true;
        })

    }

    else {
      const category: ICategoriesRequest = {
        id: this.curentEditId,
        name: this.categoriesForm.value.name,
        path: this.categoriesForm.value.path,
        file: this.categoriesForm.value.fileHiden,
      }

      this.categoriesService.updateFirebase(category, this.curentEditId).then(
        () => {
          this.getCategories()
          this.categoryPosted = true;
        }
      )
    }

    this.categoriesForm.reset();
    this.addCheckToggle();

  };

  // Видалення акції

  deleteCategories(id: string): void {
    this.categoriesService.deleteFirebase(id).then(() => this.getCategories())
  };

  // Редагування

  editCategories(category: ICategoriesRequest): void {

    this.categoriesForm.patchValue({
      name: category.name,
      path: category.path,
      hidenFile: category.file
    })
    this.editStatus = true;
    this.curentEditId = category.id;
    this.addCheck = true;
  };

  // Підгрузка фото

  upload(event: any): void {
    const file = event.target.files[0];
    this.filesService.uploadFile('images/categoriesImages', file.name, file)
      .then(data => {
        this.categoriesForm.patchValue({
          fileHiden: data
        });
        this.fileUploaded = true
      })
      .catch(err => {
        console.log(err)
      })
  };

}
