import { Component } from '@angular/core';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { FavouriteService } from 'src/app/shared/services/favourite/favourite.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductsService } from 'src/app/shared/services/products/products.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent {

  public favourites: Array<IProductsRequest> = [];
  public curentUser !: any;

  constructor(
    private productService: ProductsService,
    public orderService: OrderService,
    public favouriteService: FavouriteService
  ) { }

  ngOnInit(): void {
    this.loadFavourites();
    this.updateFavourites();
    this.getCurentUser();
  }

  loadFavourites(): void {
    if (localStorage.length > 0 && localStorage.getItem('favourites')) {
      this.favourites = JSON.parse(localStorage.getItem('favourites') as string);

      for (const favourite of this.favourites) {
        favourite.count = 1;
      }
    }
  };

  updateFavourites(): void {
    this.favouriteService.changeFavourite.subscribe(() => {
      this.loadFavourites();
    })
  };

  addToBasket(product: IProductsRequest): void {
    let basket: Array<IProductsRequest> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
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

  productCount(product: IProductsRequest, value: boolean): void {
    if (value) {
      ++product.count;
    } else if (!value && product.count > 1) {
      --product.count;
    }
  };

  favouriteDelete(favourite: IProductsRequest): void {
    this.favourites.splice(this.favourites.indexOf(favourite), 1);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
    this.favouriteService.changeFavourite.next(true);

    if (this.curentUser) {
      this.favouriteService.updateFirebase(this.favourites, this.curentUser.uid);
    }
  };

  getCurentUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.curentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
    else {
      this.curentUser = null
    }
  };

}
