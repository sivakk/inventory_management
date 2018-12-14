import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';

export interface AdminOrder {
  orderName: string;
  orderType: string;
  orderQuantity: number;
  assignedTo: string;
}

@Component({
  selector: 'app-admin-inventory',
  templateUrl: './admin-inventory.component.html',
  styleUrls: ['./admin-inventory.component.css']
})

export class AdminInventoryComponent implements OnInit {

  loading = false;
  items: AdminOrder[];
  errorMsg: string;


  constructor(private stockService: StockService) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  ngOnInit() {
    this.stockService.getAdminStock()
      .subscribe((items: AdminOrder[]) => {
        console.log('$$$$$$$$$$$$$$', items);
      this.items = items;
      },
      (err) => {
        console.log('got error', err);
        this.errorMsg = <any>err;
      }
      );
  }

}
