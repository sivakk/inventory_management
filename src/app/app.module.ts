import {
  MatSelect,
  MatOption,
  MatCardModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { AppRoutingModule } from "./staff/app-routing.module";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './auth/token.interceptor';
import { StorageServiceModule } from 'angular-webstorage-service';
import { LoginGuard } from './login.guard';

import { AppComponent } from './app.component';
import { StockComponent } from './stock/stock.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from "ngx-toastr";
import {
  MatInputModule, MatFormFieldModule, MatButtonModule, MatCheckboxModule,
  MatProgressBarModule, MatDialogModule, MatSelectModule, MatTableModule, MatDatepickerModule
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { EntriesComponent } from './entries/entries.component';
import { StockManagementComponent } from './stock-management/stock-management.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { FactoryComponent } from './factory/factory.component';
import { DialogComponent } from './dialog/dialog.component';
import { InventoryComponent } from './inventory/inventory.component';
import { AdminComponent } from './admin/admin.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { AdminInventoryComponent } from './admin-inventory/admin-inventory.component';
import { ShippingComponent } from './shipping/shipping.component';
import { KitchenDetailsComponent } from './kitchen-details/kitchen-details.component';
import { OrderListComponent } from './order-list/order-list.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { InvestmentComponent } from './investment/investment.component';
import { CartComponent } from './cart/cart.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminStockComponent } from './admin-stock/admin-stock.component';
import { AdminKitchenComponent } from './admin-kitchen/admin-kitchen.component';
import { WebsiteComponent } from './website/website.component';
import { AdminShippingComponent } from './admin-shipping/admin-shipping.component';
import { AdminCookComponent } from './admin-cook/admin-cook.component';
import { PostListComponent } from './staff/post-list/post-list.component';
import * as moment from "moment";
import { UsersComponent } from "./staff/users/users.component";

const appRoutes: Routes = [
  { path: '', redirectTo: 'web', pathMatch: 'full' },
  { path: 'web', component: WebsiteComponent },
  { path: 'webapp', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'staff', component: PostListComponent,
    children: [

      { path: '', redirectTo: 'users', pathMatch: 'full' },
      // { path: "users", component: UsersComponent },
      // { path: 'create', component: UsersComponent },
      // { path: "edit/:id", component: UsersComponent },


    ]

  },
  {
    path: 'admin', component: AdminComponent, canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'stock', component: AdminStockComponent },
      { path: 'kitchen', component: AdminKitchenComponent },
      { path: 'admin-inventory', component: AdminInventoryComponent }
    ]
  },
  {
    path: 'stockMgmt', component: StockManagementComponent, canActivate: [LoginGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'transactions', component: TransactionsComponent,
        children: [
          { path: '', redirectTo: 'investment', pathMatch: 'full' },
          { path: 'expenses', component: ExpensesComponent },
          { path: 'investment', component: InvestmentComponent }
        ]
      },
      {
        path: 'kitchen', component: KitchenComponent,
        children: [
          { path: '', redirectTo: 'kitchen-details', pathMatch: 'full' },
          { path: 'kitchen-details', component: KitchenDetailsComponent },
          { path: 'cart', component: CartComponent },
          {
            path: 'shipping', component: ShippingComponent,
            children: [
              { path: '', redirectTo: 'create-order', pathMatch: 'full' },
              { path: 'create-order', component: CreateOrderComponent },
              {
                path: 'orders-list', component: OrderListComponent,
                children: []
              }
            ]
          }
        ]
      },
      { path: 'user-management', component: UserManagementComponent },
      {
        path: 'factory', component: FactoryComponent,
        children: [
          { path: '', redirectTo: 'stock', pathMatch: 'full' },
          { path: 'stock', component: StockComponent },
          { path: 'entries', component: EntriesComponent }
        ]
      },
      { path: 'kitchen', component: KitchenComponent }
    ]
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    AppComponent,
    StockComponent,
    LoginComponent,
    EntriesComponent,
    StockManagementComponent,
    KitchenComponent,
    FactoryComponent,
    DialogComponent,
    InventoryComponent,
    AdminComponent,
    UserManagementComponent,
    AdminInventoryComponent,
    ShippingComponent,
    KitchenDetailsComponent,
    OrderListComponent,
    CreateOrderComponent,
    DashboardComponent,
    TransactionsComponent,
    ExpensesComponent,
    InvestmentComponent,
    CartComponent,
    AdminOrdersComponent,
    AdminStockComponent,
    AdminKitchenComponent,
    WebsiteComponent,
    AdminShippingComponent,
    AdminCookComponent,
    PostListComponent
  ],
  imports: [
    MatCardModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatDatepickerModule,
    StorageServiceModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [LoginGuard, TokenInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: "moment", useFactory: (): any => moment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
