import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { NgForm } from '@angular/forms';
import { KitchenService } from '../kitchen.service';
import { StockService } from '../stock.service';

export interface DialogData {
  animal: string;
  name: string;
}

export interface BoxElement {
  _id: string;
  category: string;
  boxName: string;
  tea_quantity: string;
  raw_cost: number;
  total_cost: number;
  selling_price: number;
  ingredient: string;
  ingredient_quantity: number;
  measuing_unit: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {



  animal: string;
  name: string;
  category: any[] = ['Kawa', 'Shireen', 'Sugar'];
  quantity: any[] = [ 25, 50, 100];

  loading = false;

  kitchenItems: BoxElement[];
  stockItems: any[];


  constructor(
    public dialog: MatDialog, private kitchenService: KitchenService, private stockService: StockService
  ) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
   }

  ngOnInit() {
    this.kitchenService.getKitchenItems()
    .subscribe(items => {
      this.kitchenItems = items;
      //  console.log(this.kitchenItems)
  });

  this.stockService.getStock()
      .subscribe(items => {
        this.stockItems = items;
        // console.log(items)
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  openDialog(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      height: '600px',
      data: {
        _id: item._id, category: item.category, ingredient_quantity: item.ingredient_quantity,
        ingredient: item.ingredient, stock: this.stockItems
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (result) {
      console.log(result);

      const index = result.stock.findIndex(x => x.name === result.ingredient);

      if (result.ingredient_quantity > result.stock[index].quantity) {
        alert('Selected uantity cannot be greater than that available in stock. Please try again.');
      } else {
        this.updateKitchenItem(result);
      }
      }
    });
  }

  addBox(form: NgForm) {
    const newKitchenItem = form.value;

    const newFullKitchenItem = {
      'category': newKitchenItem.category,
      'boxName': newKitchenItem.boxName,
      'tea_quantity': newKitchenItem.tea_quantity,
      'raw_cost': newKitchenItem.raw_cost,
      'total_cost': newKitchenItem.total_cost,
      'selling_price': newKitchenItem.selling_price,
      'profit': +newKitchenItem.selling_price - +newKitchenItem.total_cost,
      'ingredient': '',
      'ingredient_quantity': null
    };
    console.log(newFullKitchenItem);

    this.kitchenService.addKitchenItem(newFullKitchenItem)
      .subscribe(item => {
        this.kitchenItems.push(item);
          console.log(newKitchenItem);
          console.log('%%%%%%%%%%%%');
          console.log(newFullKitchenItem);
      });
  }

  updateKitchenItem(item) {
   // this.loading = true;
    const items = this.kitchenItems;

    console.log('@@@@@@@@@@', item);

    this.kitchenService.updateKitchenItem(item).subscribe(data => {

        for ( let i = 0; i < items.length; i++) {
            if (items[i]._id === item._id) {
              items[i].ingredient = item.ingredient;
              items[i].ingredient_quantity = item.ingredient_quantity;
            }
        }
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
