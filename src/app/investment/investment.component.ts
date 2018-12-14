import { Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material';
import { NgForm } from '@angular/forms';

/* services */
import { TransactionsService } from '../transactions.service';


@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css']
})
export class InvestmentComponent implements OnInit {

  public investments = []

  loading = false;

  constructor(
    private transact: TransactionsService
  ) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  d: any;

  ngOnInit() {
    const d = new Date();
    let numberDate = d.getFullYear() + '-' +  d.getMonth() + '-' + d.getDate();
    numberDate = numberDate.toString();
  
    this.transact.getInvestments()
    .subscribe(items => {
      this.investments = items;
  });
  }

  addInvestment(form: NgForm) {

    let newTransaction = form.value

    newTransaction.type = 'investment'
    console.log('got form value', newTransaction)

    this.transact.addNewInvestment(newTransaction)
    .subscribe(data => {
      if (data.status === 'success') {
        this.investments.unshift(data)
      }
      
    });

  }

  deleteInvestment(item) {
    const id = item._id;
    this.loading = true;


    this.transact.deleteInvestment(id).subscribe(data => {
      console.log(data);
      if (data.n === 1) {
        for ( let i = 0; i < this.investments.length; i++) {
            if (this.investments[i]._id === id) {
              this.investments.splice(i, 1);
            }
        }
      }
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

}
