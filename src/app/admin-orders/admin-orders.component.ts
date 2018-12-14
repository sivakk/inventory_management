import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { StockService } from '../stock.service';

export interface AdminOrder {
  orderName: string;
  orderType: string;
  orderQuantity: number;
  assignedTo: string;
}

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[];
  loading = false;
  items: AdminOrder[];
  errorMsg: string;


  constructor(
    private ordersService: OrdersService,
    private stockService: StockService
  ) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
   }

  ngOnInit() {
    this.stockService.getAdminStock()
      .subscribe((items: AdminOrder[]) => {
        console.log('admin orders in ngOninit', items);
        this.items = items;
      },
        (err) => {
          console.log('got error', err);
          this.errorMsg = <any>err;
        }
      );
  }

  receiveOrder(item) {
    console.log('recevied order', item);
  }

}
