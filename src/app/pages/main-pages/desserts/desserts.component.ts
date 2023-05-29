import { Component } from '@angular/core';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent {

  public productsArray!: Array<IProductsRequest>;
  public dessertsArray!: Array<IProductsRequest>;

  constructor(
    private productService: ProductsService,
  ) { };

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getAllFirebaseByCategory("desserts").subscribe(
      data => {
        this.productsArray = data as IProductsRequest[];
      }
    )
  };

  productCount(product: IProductsRequest, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

}
