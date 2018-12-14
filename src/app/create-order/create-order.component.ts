import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { KitchenService } from '../kitchen.service';
import { UsersService } from '../users.service';
import { OrdersService } from '../orders.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {

  constructor(
    private boxService: KitchenService,
    private stockService: StockService,
    private userService: UsersService,
    private ordersService: OrdersService
  ) { }

  categories: any[];
  stock: any[];
  users: any[];
  orders: any[];
  loading = false;
  admins = [];
  boxes = [];
  showStockOrder= false;
  showBoxOrder= false;

  ngOnInit() {

  this.ordersService.getOrders()
    .subscribe(items => {
      this.orders = items;
  });

    this.stockService.getStock()
    .subscribe(items => {
      this.stock = items;
  });

  this.boxService.getKitchenItems()
    .subscribe(items => {
      items.forEach(item => {
        if (item.box_type === 'Box') {
          this.boxes.push(item);
        }
      });
      this.categories = items;
  });

  this.userService.getUsers()
  .subscribe(items => {
    items.forEach(user => {
      if (user.type === 'admin') {
        this.admins.push(user);
      }
    });
    this.users = items;
  });
  }

  OrderValChanged = (val: any) => {
    if (val === 'Box') {
      this.showBoxOrder = true
      this.showStockOrder = false
    }
    else if (val === 'Stock') {
      this.showStockOrder = true
      this.showBoxOrder = false
    }
  }

  addBoxOrder(form: NgForm) {

    this.loading = true;

    const newOrder = form.value;

    console.log('new order: ', newOrder);

    this.categories.forEach((x) => {
      if (x.category === newOrder.tea_type) {
        // console.log(x.ingredients)

        x.ingredients.forEach((z) => {
          this.stock.forEach((y) => {
            // console.log(z.name , y.name)
              // console.log(y)
          });
        });

        const cond = true;

        let updateStockObject = {};

        this.stock.forEach((y) => {
          x.ingredients.forEach((z) => {
            if (z.name === y.name && cond) {
              const remaining_quantity = +y.quantity - +z.quantity;

              updateStockObject = {
                _id: y._id,
                remaining_quantity: remaining_quantity
              };

              this.updateStockItem(updateStockObject);

              console.log(updateStockObject);

            }
          });
        });
      }
    });

    this.ordersService.addOrder(newOrder)
      .subscribe(item => {
        this.orders.push(item);
      });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  updateStockItem(item) {
       this.stockService.updateStock(item).subscribe(data => {
        console.log(data);
    });
  }

  deleteOrder(item) {
    const id = item._id;


    this.loading = true;

    const items = this.orders;

    this.ordersService.deleteOrder(id).subscribe(data => {
      if (data.n === 1) {
        for ( let i = 0; i < items.length; i++) {
            if (items[i]._id === id) {
              items.splice(i, 1);
              console.log('deleted item:', items);
            }
        }
      }
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
