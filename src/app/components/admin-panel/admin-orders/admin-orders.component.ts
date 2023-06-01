import { Component } from '@angular/core';
import { IOrderRequest } from 'src/app/shared/interfaces/order/order.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  public ordersArray !: Array<IOrderRequest>;

  constructor(
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getAllFirebase().subscribe(
      data => { this.ordersArray = data as IOrderRequest[] }
    )
  };

  deleteOrder(id: string): void {
    this.orderService.deleteFirebase(id).then(() => this.getOrders())
  };

}
