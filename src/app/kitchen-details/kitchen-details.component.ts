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
  ingredients: any;
  canEditCode: boolean;
}


@Component({
  selector: 'app-kitchen-details',
  templateUrl: './kitchen-details.component.html',
  styleUrls: ['./kitchen-details.component.css']
})

export class KitchenDetailsComponent implements OnInit {

  animal: string;
  name: string;
  category: any[] = ['Kawa', 'Shireen', 'Sugar'];
  box_type;
  box_quantity: any[] = [ 25, 50, 100];
  can_quantity: any[] = [ 35, 70, 105 ];
  quantity = this.box_quantity;
  tea_quantity_switch: boolean;
  ingredient_name: string;
  ingredient_quantity: number;
  edit_total_cost: number;

  loading = false;

  kitchenItems: BoxElement[];
  stockItems: any[];

  constructor(
    public dialog: MatDialog, private kitchenService: KitchenService, private stockService: StockService
  ) {}

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

  updateTotalCost = (totalCost, id) => {
    console.log('total cost and id', totalCost, id);
    const total_cost_object = {
      total_cost: totalCost,
      _id: id
    };
    this.kitchenService.updateTotalCost(total_cost_object)
    .subscribe(item => {
      this.kitchenItems.forEach((x) => {
        if (x._id === id) {
          x.total_cost = totalCost;
          console.log('setting total cost in front', x);
        }
      });
    });
  }

  onBlurMethod(i) {
    if (this.edit_total_cost) {
      this.kitchenItems[i].total_cost = this.edit_total_cost;
      const id = this.kitchenItems[i]._id;
      this.updateTotalCost(this.edit_total_cost, id);
      console.log(this.kitchenItems[i].total_cost + ' ' + this.edit_total_cost);
      this.edit_total_cost = null;
    } else {
      alert('no value given, please try again');
    }
   }

  setCodeEdit(i) {
    this.kitchenItems.forEach(t => t.canEditCode = false);
    this.kitchenItems[i].canEditCode = true;
  }

  toggleQuantity = () => {
    console.log('$$$$$$$$$$', this.box_type);
    if (this.box_type === 'Box') {
      this.quantity = this.quantity;
      console.log('box', this.quantity);
    } else {
      console.log('can', this.quantity);
      this.quantity = this.can_quantity;
    }
  }

  ContainerValChanged = (val: any) => {
    console.log('getting this value', val);

    if (val === 'Can') {
      this.quantity = this.can_quantity;
      console.log('can', this.quantity);
    } else {
      this.quantity = this.box_quantity;
      console.log('box', this.box_quantity);
    }
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  condition = (result, stock) => {
    const id = result._id;
    stock.forEach(stock_item => {
      if (stock_item._id === id) {
        console.log('stock items', id, stock_item._id, stock_item.quantity);
        return stock_item.quantity;
      }
    });
  }

  openDialog(item): void {
    console.log(item);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      height: '600px',
      data: {
        item: item, _id: item._id, category: item.category, ingredients: item.ingredients,
        stock: this.stockItems, ingredient_name: this.ingredient_name, ingredient_quantity: this.ingredient_quantity,
        raw_cost: item.raw_cost
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('got result', result, result.ingredient_quantity);

        const name = result.ingredient_name;
        result.stock.forEach(stock_item => {
          console.log('iterating through stock', stock_item.name);
          if (stock_item.name === name) {
            console.log('stock items', stock_item._id, stock_item.quantity);
            if (result.ingredient_quantity > stock_item.quantity) {
              alert('Selected quantity cannot be greater than that available in stock. Please try again.');
            } else {
              console.log('ingredient may be added',
              result.ingredient_name, result.ingredient_quantity, stock_item.name, stock_item.quantity);
              // this.updateKitchenItem(result)
            }
          }
        });
      }
    });
  }

  addBox(form: NgForm) {
    const newKitchenItem = form.value;
    if (!newKitchenItem.category || !newKitchenItem.tea_quantity) {
      alert('tea name and quantity are required to add a box or can');
    } else {

        this.loading = true;

      const newFullKitchenItem = {
        box_type: newKitchenItem.box_type,
        category: newKitchenItem.category,
        tea_quantity: newKitchenItem.tea_quantity,
        total_cost: newKitchenItem.total_cost,
        selling_price: newKitchenItem.selling_price,
        profit: +newKitchenItem.selling_price - +newKitchenItem.total_cost,
        ingredients: [],
        raw_cost: null
      };

      if (newKitchenItem.box_type === 'Can') {
        newFullKitchenItem.raw_cost = '-';
      } else {
          newFullKitchenItem.raw_cost = 0;
      }

      this.kitchenService.addKitchenItem(newFullKitchenItem)
        .subscribe(item => {
          this.kitchenItems.unshift(item);
          form.reset();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        });
  }
}

  updateKitchenItem(item) {
    this.loading = true;
    const items = this.kitchenItems;

    const ingredient_item = {
      ingredient_name: item.ingredient_name,
      ingredient_quantity: item.ingredient_quantity
    };

    console.log('updating ktichen item with new data', ingredient_item);

    this.kitchenService.updateKitchenItem(ingredient_item).subscribe(data => {
      for (let i = 0; i < items.length; i++) {
        if (items[i]._id === item._id) {
          items[i].ingredients.push(ingredient_item);
        }
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  deleteKitchenItem(item) {
    const id = item._id;
    this.loading = true;
    const items = this.kitchenItems;

    this.kitchenService.deleteKitchenItem(id).subscribe(data => {
      console.log(data);
      if (data.n === 1) {
        for ( let i = 0; i < items.length; i++) {
            if (items[i]._id === id) {
              items.splice(i, 1);
            }
        }
      }
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }


}
