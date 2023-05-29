import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoriesRequest } from 'src/app/shared/interfaces/categories/categories.interface';
import { IProductsPost, IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { FilesService } from 'src/app/shared/services/files/files.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent {

  public addCheck = false;

  public productsForm!: FormGroup;

  public fileUploaded = false;
  public productPosted = false;

  public editStatus = false;
  private curentEditId!: string;
  public categoryOpen = false;

  public productsArray!: Array<IProductsRequest>;
  public categoriesArray!: Array<ICategoriesRequest>;

  public subCategoriesArray = [ ["Гостра", "spicy"], ["М'ясо", "meat"], ["Овочі", "vegies"], ["Морепродукти", "fish"]];

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private filesService: FilesService
  ) { };

  ngOnInit(): void {
    this.initProductsForm();
    this.getProducts();
    this.getCategories();
  }

  addCheckToggle(): void {
    this.addCheck = !this.addCheck;
    this.fileUploaded = false;
    this.editStatus = false;
    this.productsForm.reset();
  }

  categoryChange(): void{
    this.categoryOpen = true;
  }

  initProductsForm(): void {
    this.productsForm = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
      subCategory: [null],
      mass: [null, Validators.required],
      price: [null, Validators.required],
      text: [null, Validators.required],
      file: [null, Validators.required],
      fileHiden: [null, Validators.required]
    })
  };

  // Підгрузка 

  getProducts(): void {
    this.productService.getAllFirebase().subscribe(
      data => { this.productsArray = data as IProductsRequest[] }
    )
  };

  getCategories(): void {
    this.categoriesService.getAllFirebase().subscribe(
      data => { this.categoriesArray = data as ICategoriesRequest[]}
    )
  };

  // Створення і редагування

  createProduct(): void {
    if (!this.editStatus) {
      const product: IProductsPost = {
        name: this.productsForm.value.name,
        category: this.productsForm.value.category,
        subCategory: this.productsForm.value.subCategory,
        mass: this.productsForm.value.mass,
        price: this.productsForm.value.price,
        text: this.productsForm.value.text,
        file: this.productsForm.value.fileHiden,
        count: 1,
        display: "block"
      }

      this.productService.createFirebase(product).then(
        () => {
          this.getProducts()
          this.productPosted = true;
      })

    }

    else {

      const product: IProductsRequest = {
        id: this.curentEditId,
        name: this.productsForm.value.name,
        category: this.productsForm.value.category,
        subCategory: this.productsForm.value.subCategory,
        mass: this.productsForm.value.mass,
        price: this.productsForm.value.price,
        text: this.productsForm.value.text,
        file: this.productsForm.value.fileHiden,
        count: 1,
        display: "block"
      }

      this.productService.updateFirebase(product, this.curentEditId).then(
        () => {
          this.getProducts()
          this.productPosted = true;
        }
      )


    }

    this.productsForm.reset();
    this.addCheckToggle();

  };

  // Видалення акції

  deleteProduct(id: string): void {
    this.productService.deleteFirebase(id).then(() => this.getProducts())
  };

  // Редагування

  editProduct(product: IProductsRequest): void {

    this.productsForm.patchValue({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory,
      mass: product.mass,
      price: product.price,
      text: product.text,
      hiddenFile: product.file
    })

    this.editStatus = true;
    this.curentEditId = product.id;
    this.addCheck = true;
  };

  // Підгрузка фото

  upload(event: any): void {
    const file = event.target.files[0];
    this.filesService.uploadFile('images/newsImages', file.name, file)
      .then(data => {
        this.productsForm.patchValue({
          fileHiden: data
        });
        this.fileUploaded = true
      })
      .catch(err => {
        console.log(err)
      })
  };

}
