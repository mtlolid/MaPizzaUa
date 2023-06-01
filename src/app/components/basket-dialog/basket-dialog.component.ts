import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IOrderPost } from 'src/app/shared/interfaces/order/order.interface';
import { IProductsPost, IProductsRequest } from 'src/app/shared/interfaces/products/products.intefrace';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent {

  public total = 0;
  public basket: Array<IProductsRequest> = [];
  public curentUser!: any
  public phoneNumber = '';

  constructor(
    public dialogRef: MatDialogRef<BasketDialogComponent>,
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.getCurentUser();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  orderProducts(): void {
    if (this.phoneNumber != '' && this.basket.length != 0) {

      let order: IOrderPost = {
        user: this.phoneNumber,
        products: this.basket,
        date: Date(),
        typeOfUser: 'guest'
      }

      this.phoneNumber = '';

      this.orderService.createFirebase(order).then(
        () => {
          localStorage.removeItem('basket');
          this.basket = [];
          this.orderService.changeBasket.next(true);
          this.showSuccess('Успішно')
          window.location.reload();
        })
    }
    else if (this.curentUser != null) {
      let order: IOrderPost = {
        user: `${this.curentUser.phone} ${this.curentUser.email} `,
        products: this.basket,
        date: Date(),
        typeOfUser: 'user'
      }

      this.orderService.createFirebase(order).then(
        () => {
          let userOrder = {
            date: Date(),
            products: this.basket
          }

          this.curentUser.orders.push(userOrder);
          localStorage.setItem('currentUser', JSON.stringify(this.curentUser));

          this.orderService.updateFirebase(this.curentUser.orders, this.curentUser.uid);

          localStorage.removeItem('basket');
          this.basket = [];
          this.orderService.changeBasket.next(true);

          this.showSuccess('Успішно')
          window.location.reload();
      })
    }
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductsPost) => total + prod.count * prod.price, 0);
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
      this.getTotalPrice();
    })
  }

  productCount(product: IProductsRequest, value: boolean): void {
    if (value) {
      ++product.count;
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.orderService.changeBasket.next(true);
    } else if (!value && product.count > 1) {
      --product.count;
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.orderService.changeBasket.next(true);
    }
  };

  productDelete(product: IProductsRequest): void {
    this.basket.splice(this.basket.indexOf(product), 1);
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  };

  getCurentUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('currentUser')) {
      this.curentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    }
    else {
      this.curentUser = null
    }
  };

  showSuccess(message: string) {
    this.toastr.success(message);
  }



}
