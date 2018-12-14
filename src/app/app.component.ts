import { Component } from '@angular/core';
import { StockService } from './stock.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[StockService]
})
export class AppComponent {
  title = 'app';
}
