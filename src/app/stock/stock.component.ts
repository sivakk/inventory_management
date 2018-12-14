import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { NgForm } from '@angular/forms';

export interface StockItem {
  stock_name: string;
  stock_measuring_unit: string;
  stock_unit_cost: number;
  stock_quantity: number;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {
  items = [];
  new_stock_item: any = {};
  editMode = true;
  loading = false;
  updateQuantity: number;
  errorMsg: string;
  displayRow = 0;

  setEdit() {
    if (this.editMode === true) {
      this.editMode = false;
    } else {
      this.editMode = true;
    }
  }

  constructor(
    private stockService: StockService,
  ) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }

  ngOnInit() {
    this.stockService.getStock()
      .subscribe(stock => {
        const stockArray = Object.values(stock);
        this.items = stockArray;
      });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  Temp(idx) {
    console.log(idx, this.displayRow);
    // this.editMode
    this.displayRow = idx;
  }

  addStockItem(form: NgForm) {
    this.loading = true;

    const newItem = form.value;
    newItem.stock_total_cost = +newItem.stock_quantity * +newItem.stock_unit_cost;
    newItem.stock_rem_quantity = null;

    this.stockService.addStock(newItem)
      .subscribe(
      (item) => {
          this.new_stock_item = item;
          this.items.push(this.new_stock_item);
          form.reset();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        },
        (err) => {
          console.log('got error', err);
          this.errorMsg = <any>err;
        }
      );
  }

  deleteItem(item) {
    const id = item._id;
    this.loading = true;

    const items = this.items;

    this.stockService.deleteStock(id).subscribe(data => {
      console.log('deleted item', data);
      if (data.operation === 'delete') {
        for (let i = 0; i < items.length; i++) {
          if (items[i]._id === id) {
            items.splice(i, 1);
            setTimeout(() => {
              this.loading = false;
            }, 1000);
          }
        }
      }
    });
  }

  updateItem(item) {
    this.loading = true;
    const items = this.items;

    if (this.updateQuantity) {
      item.quantity = +this.updateQuantity + +item.quantity;
    }

    const updatedItem = {
      _id: item._id,
      date: item.date,
      name: item.name,
      cost: item.cost,
      measuring_unit: item.measuring_unit,
      quantity: item.quantity,
      total_cost: +item.cost * +item.quantity
    };

    this.stockService.editStock(updatedItem).subscribe(data => {

      for (let i = 0; i < items.length; i++) {
        if (items[i]._id === item._id) {
          items[i].quantity = item.quantity;
          items[i].cost = item.cost;
          items[i].total_cost = +item.cost * +item.quantity;
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
    });
  }
}
