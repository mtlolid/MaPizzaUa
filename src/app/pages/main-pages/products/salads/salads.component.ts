import { Component } from '@angular/core';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { FavouriteService } from 'src/app/shared/services/favourite/favourite.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-salads',
  templateUrl: './salads.component.html',
  styleUrls: ['./salads.component.scss']
})
export class SaladsComponent {

  public productsArray!: Array<IProductsRequest>;
  public curentUser !: any;

  constructor(
    private productService: ProductsService,
    public orderService: OrderService,
    public favouriteService: FavouriteService
  ) { };

  ngOnInit(): void {
    this.getProducts();
    this.getCurentUser();
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

  addToFavourite(product: IProductsRequest): void {
    let favourites: Array<IProductsRequest> = [];
    if (localStorage.length > 0 && localStorage.getItem('favourites')) {
      favourites = JSON.parse(localStorage.getItem('favourites') as string);
      if (favourites.some(prod => prod.id === product.id)) {
        const index = favourites.findIndex(prod => prod.id === product.id);
        favourites[index].count += product.count;
      } else {
        favourites.push(product);
      }
    } else {
      favourites.push(product);
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));

    if (this.curentUser) {
      this.favouriteService.updateFirebase(favourites, this.curentUser.uid);
    }

    product.count = 1;
    this.favouriteService.changeFavourite.next(true);
  };

  getCurentUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.curentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
    else {
      this.curentUser = null
    }
  };

  getProducts(): void {
    this.productService.getAllFirebaseByCategory("salads").subscribe(
      data => {
        this.productsArray = data as IProductsRequest[];
      }
    )
  };

  subCategoryChange(sub: string) {
    for (const product of this.productsArray) {

      if (sub != "all") {

        let productCheck = product.subCategory as Array<string>;

        if(productCheck != null){
          if (productCheck.includes(sub)) {
            product.display = "block";
          }
  
          else {
            product.display = "none";
          }
        }
        else{
          product.display = "none"
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
