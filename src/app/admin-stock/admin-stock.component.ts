import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';


@Component({
  selector: 'app-admin-stock',
  templateUrl: './admin-stock.component.html',
  styleUrls: ['./admin-stock.component.css']
})
export class AdminStockComponent implements OnInit {

  loading = false;

  stock: any[];


  constructor(    private stockService: StockService  ) { }

  ngOnInit() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);

    this.stockService.getStock()
  .subscribe(items => {
    this.stock = items;
     console.log('########!!@@@@#####', this.stock);
  });
  }

}
