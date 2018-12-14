import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { KitchenService } from '../kitchen.service';
import { StockService } from '../stock.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';


export interface DialogData {
  ingredient: string;
  ingredient_quantity: number;
  category: string;
  stock: any[];
  _id; string;
  raw_cost: number;
  ingredients: any[];
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  ingredients: any[] = [];
  stock: any[];
  kitchenItems: any[];
  tea_type_id: string;
  temp_raw_cost: number;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private kitchenService: KitchenService,
    private stockService: StockService
  ) {}

  ngOnInit() {
    this.kitchenService.getKitchenItems()
      .subscribe(items => {
        this.kitchenItems = items;
      });
  this.stockService.getStock()
  .subscribe(items => {
    this.ingredients = items;
  });
  }

  updateKitchen = (raw_cost, tea_type_id) => {
    const updateKitchenItem = {
      raw_cost: raw_cost,
      tea_type_id: tea_type_id
    };
    this.kitchenService.updateKitchenItem(updateKitchenItem).subscribe(data => {

      console.log('updating the raw cost of the kitchen item', data);

   });
  }

  addIngredient(form: NgForm) {


    const item = form.value;
    const tea_type_id = item.tea_type_id;
                const newIngredient = {
              name: item.ingredient_name,
              quantity: item.ingredient_quantity,
              details: ''
            };

    const id = this.data._id;


    this.upDatefrontEnd(newIngredient, tea_type_id);
    this.updateKitchenIngredient(newIngredient, tea_type_id);
    // this.updateKitchen(newIngredient, item.tea_type_id);



  //   this.stockService.getStock()
  //   .subscribe(items => {
  //     items.forEach((x, i) => {

  //       // console.log(x)
  //       // added name == name in stock
  //       if (x.name === item.ingredient_name) {
  //         console.log('stock name, added name', x.name, item.ingredient_name);

  //         // if added quantity is more than available quantity in stock
  //         if (x.quantity < item.ingredient_quantity) {
  //           alert('not psbl to add' + ' ' + item.ingredient_quantity + ' from ' + x.quantity);
  //         // if added quantity is not more than available quantity in stock
  //         } else {
  //           const newIngredient = {
  //             name: item.ingredient_name,
  //             quantity: item.ingredient_quantity,
  //             details: x
  //           };

  //           let present_raw_cost = item.raw_cost + item.ingredient_quantity * x.cost;
  //           console.log('total raw cost calculated:', item.raw_cost, x.cost);

  //           if (this.temp_raw_cost) {
  //             present_raw_cost = this.temp_raw_cost + item.ingredient_quantity * x.cost;
  //           } else {
  //             present_raw_cost = item.raw_cost + item.ingredient_quantity * x.cost;
  //             this.temp_raw_cost = present_raw_cost;
  //           }

  //           this.updateKitchen(present_raw_cost, item.tea_type_id);

  //           this.updateKitchenIngredient(newIngredient, tea_type_id);
  //           this.upDatefrontEnd(newIngredient, tea_type_id);

  //           const remaining_ingredient_quantity = x.quantity - item.ingredient_quantity;
  //           const updateStockObj = {
  //             remaining_quantity: remaining_ingredient_quantity,
  //             _id: x._id
  //           };
  //         }
  //       }

  //       if (x._id === tea_type_id) {


  //       }
  //   });
  // });
  }

  upDatefrontEnd(item, id) {
    this.kitchenItems.forEach((x, i) => {
      // var index = x.indexOf( record => record._id === id );
      // console.log('#####@@@@@@', index);
      if (x._id === id) {
        this.tea_type_id = id;
        console.log(x._id, id, i);
        this.kitchenItems[i].ingredients.push(item);
        console.log('pushing the ingredients into the kitchen Items', this.kitchenItems[i].ingredients);
      }
    });
    this.updateFront(item);
  }

  updateFront(item) {
    console.log('item', item);
    const name = item.name;
    const quantity = item.quantity;
    const markup = `<tr><td>${name}</td><td>${quantity}</td><td><button>Delete</button></td><tr>`;
    $('#ingredientsTable').append(markup);

    console.log('adding to array with javascript');
  }

  updateKitchenIngredient(item, id) {
    this.kitchenService.updateKitchenIngredient(item, id).subscribe(data => {

      console.log('!!!!!!!', item);

   });
  }

  updateStock(item) {
    this.stockService.updateStock(item).subscribe(data => {

      console.log('!!!!!!!', item);

   });
  }

  updateKitchenItem(item) {
    // this.loading = true;
     const items = this.kitchenItems;

     console.log('@@@@@@@@@@', item);

     this.kitchenService.updateKitchenItem(item).subscribe(data => {

        //  for ( var i=0; i< items.length; i++ ) {
        //      if (items[i]._id == item._id){
        //        items[i].ingredient = item.ingredient;
        //        items[i].ingredient_quantity = item.ingredient_quantity;
        //      }
        //  }

     });
   }

    onNoClick(): void {
      this.dialogRef.close();
    }


}
