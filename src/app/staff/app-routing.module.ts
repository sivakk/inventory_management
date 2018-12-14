//import { StaffComponent } from './staff.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";

import { PostListComponent } from "./post-list/post-list.component";
import { UsersComponent } from "./users/users.component";


 const routes: Routes = [
//  { path: "", component: PostListComponent },
 { path: "create", component: UsersComponent },
{ path: "edit/:user_Id", component: UsersComponent}
  
];


@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }