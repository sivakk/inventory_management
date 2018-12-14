import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { CartService } from '../cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private cartService: CartService
  ) { }

  users: any[];
  admins: any[] = [];
  staff: any[] = [];
  loading = false;
  carts: any[] = [];

  ngOnInit() {
    this.userService.getUsers()
    .subscribe(items => {
      this.users = items;

      for (const user of this.users) {
        if (user.type === 'admin') {
            this.admins.push(user);
        }
      }

      for (const user of this.users) {
        if (user.type === 'staff') {
            this.staff.push(user);
        }
      }
    });

    this.cartService.getCarts()
    .subscribe(items => {
      this.carts = items;
    });
  }

  addCart(form: NgForm) {
    this.loading = true;

    const newCart = form.value;

    this.cartService.addCart(newCart)
      .subscribe(item => {
        this.carts.push(item);
        console.log(item);
      });

    setTimeout(() => {
      this.loading = false;
    }, 1000);

  }

}


