import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-kitchen',
  templateUrl: './admin-kitchen.component.html',
  styleUrls: ['./admin-kitchen.component.css']
})
export class AdminKitchenComponent implements OnInit {

  loading = false;
  today: string;

  constructor() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  d: any;
  tea_quantity_range: number;
  name: string;
  quantity: number;

  ngOnInit() {
    const d = new Date();
    this.today = new Date().toISOString().split('T')[0];

    let numberDate = d.getFullYear() + '-' +  d.getMonth() + '-' + d.getDate();

    numberDate = numberDate.toString();

    console.log(numberDate.toString());

    console.log(d);
  }

  addItem(event) {
  }


}
