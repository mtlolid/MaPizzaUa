import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';
import { ICategoriesRequest } from 'src/app/shared/interfaces/categories/categories.interface';
import { BasketDialogComponent } from '../basket-dialog/basket-dialog.component';
import { IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ROLE } from 'src/app/shared/constants/roles.enum';
import { AccountService } from 'src/app/shared/services/account/account.service';
import { FavouriteService } from 'src/app/shared/services/favourite/favourite.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public categoriesArray!: Array<ICategoriesRequest>;
  
  public basket: Array<IProductsRequest> = [];
  public favourites: Array<IProductsRequest> = [];
  public totalPrice = 0;
  public totalProducts = 0;

  public totalFavourite = 0;

  public isLogined = false;
  public loginUrl = '';

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    public orderService: OrderService,
    public favouriteService: FavouriteService,
    public accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.getCategories();

    this.loadBasket();
    this.updateBasket();

    this.loadFavourites();
    this.updateFavourites();

    this.checkUserLogin();
    this.checkUpdatesUserLogin();
  }

  // Логінування

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LoginDialogComponent, {
      width: '560px',
      height: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  };

  checkUpdatesUserLogin(): void {
    this.accountService.isUserLogin$.subscribe(() => {
      this.checkUserLogin();
    })
  };

  checkUserLogin(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN) {
      this.isLogined = true;
      this.loginUrl = 'admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogined = true;
      this.loginUrl = 'user-cabinet';
    } else {
      this.isLogined = false;
    }
  };

  // Улюблене

  loadFavourites(): void {
    if(localStorage.length > 0 && localStorage.getItem('favourites')){
      this.favourites = JSON.parse(localStorage.getItem('favourites') as string);
    }
    else{
      this.favourites = []
    }
    this.getTotalFavourites();
  };

  getTotalFavourites(): void {
    this.totalFavourite = this.favourites.length
  };

  updateFavourites(): void {
    this.favouriteService.changeFavourite.subscribe(() => {
      this.loadFavourites();
    })
  };

  // Кошик

  openBasket(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(BasketDialogComponent, {
      width: '540px',
      height: '95%',
      enterAnimationDuration,
      exitAnimationDuration,
      position: {right:'20px', top: '20px'} 
    });
  };

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalProducts();
  };

  getTotalPrice(): void {
    this.totalPrice = this.basket
      .reduce((total: number, prod: IProductsRequest) => total + prod.count * prod.price, 0);
  };

  getTotalProducts(): void {
    this.totalProducts = this.basket
      .reduce((totalProducts: number, prod: IProductsRequest) => totalProducts + prod.count, 0);
  };

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
    })
  };

  // Категорії

  getCategories(): void {
    this.categoriesService.getAllFirebase().subscribe(
      data => { this.categoriesArray = data as ICategoriesRequest[] }
    )
  };

}
