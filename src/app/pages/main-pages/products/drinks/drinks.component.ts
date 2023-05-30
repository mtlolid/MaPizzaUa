import { Component } from '@angular/core';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent {

  public productsArray!: Array<IProductsRequest>;
  public dessertsArray!: Array<IProductsRequest>;

  constructor(
    private productService: ProductsService,
    public orderService: OrderService
  ) { };

  ngOnInit(): void {
    this.getProducts();
  };

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
  };

  getProducts(): void {
    this.productService.getAllFirebaseByCategory("drinks").subscribe(
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
  };

}
