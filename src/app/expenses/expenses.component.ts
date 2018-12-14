import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  loading = false;

  items = [
    {
      name: 'Item name',
      amount: 300,
      description: 'sample expense',
      actions: 'edit,delete'
    },
    {
      name: 'Item name',
      amount: 500,
      description: 'sample expense',
      actions: 'edit,delete'
    }
  ];

  constructor() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
   }

  ngOnInit() {
  }

}
