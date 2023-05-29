import { Component } from '@angular/core';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent {

  public productsArray!: Array<IProductsRequest>;

  constructor(
    private productService: ProductsService,
  ) { };

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllFirebaseByCategory("pizza").subscribe(
      data => {
        this.productsArray = data as IProductsRequest[];
      }
    )
  };

  subCategoryChange(sub: string) {
    for (const product of this.productsArray) {

      if (sub != "all") {

        let productCheck = product.subCategory as Array<string>;

        if (productCheck.includes(sub)) {
          product.display = "block";
        }

        else {
          product.display = "none";
        }
      }

      else{
        product.display = "block"
      }

    }
  }

  productCount(product: IProductsRequest, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  }


}
