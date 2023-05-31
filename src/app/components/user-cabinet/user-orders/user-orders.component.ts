import { Component } from '@angular/core';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {

  public currentUser!: any;

  ngOnInit(): void {
    this.getCurentUser();
  }

  getCurentUser(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
  };

}
