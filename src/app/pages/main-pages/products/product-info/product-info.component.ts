import { Component } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {

  public currentProduct !: IProductsRequest;

  constructor(
    private productsService: ProductsService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.productsService.getOneFirebase(id).subscribe(data => {
      this.currentProduct = data as IProductsRequest;
    })
  }
  
  addToBasket(product: IProductsRequest): void {
    let basket: Array<IProductsRequest> = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }

  productCount(product: IProductsRequest, value: boolean): void {
    if(value){
      ++product.count;
    } else if(!value && product.count > 1){
      --product.count;
    }
  }

}
