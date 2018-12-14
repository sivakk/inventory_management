// import { Component, OnInit } from '@angular/core';
// import { NgModule } from "@angular/core";
// import { formatDate } from "@angular/common";
// import { ReactiveFormsModule } from "@angular/forms";
// import { MatNativeDateModule } from "@angular/material";
// import { BrowserModule } from "@angular/platform-browser";
// import { UsersService } from './users.service';
// import { User } from "./user.model";
// import { mimeType } from "./users/mime-type.validator";
// import { RouterModule, Routes } from '@angular/router';
// import {
//   FormGroup,
//   FormsModule,
//   FormControl,
//   AbstractControl,
//   Validators
// } from "@angular/forms";
// import { ActivatedRoute, ParamMap, Params } from "@angular/router";


// @Component({
//   selector: 'app-staff',
//   templateUrl: './staff.component.html',
//   styleUrls: ['./staff.component.css']
// })
// export class StaffComponent implements OnInit {

//   user: User;
//   isLoading = false;
//   form: FormGroup;
//   imagePreview: any;
//   private mode = "create";
//   private userId: string;
//   customers = ["sai", "siva", "murali"];
//   selectedValue: string;
//   selectedCar: string;





//   constructor(public usersService: UsersService, public route: ActivatedRoute) { }

//   ngOnInit() {
//     this.form = new FormGroup({
//       name: new FormControl(null, {
//         validators: [Validators.required, Validators.minLength(3)]
//       }),
//       username: new FormControl(null, { validators: [Validators.required] }),
//       image: new FormControl(null, {
//         validators: [Validators.required],
//         asyncValidators: [mimeType]
//       })
//     });
//     this.route.paramMap.subscribe((paramMap: ParamMap) => {
//       if (paramMap.has("user_Id")) {
//         this.mode = "edit";
//         this.userId = paramMap.get("user_Id");
//         this.isLoading = true;
//         this.usersService.getPost1(this.userId).subscribe(userData => {
//           this.isLoading = false;
//           this.user = {
//             id: userData._id,
//             name: userData.name,
//             username: userData.username,
//             imagedisplay: userData.imagedisplay
//           };
//           this.form.setValue({
//             name: this.user.name,
//             username: this.user.username,
//             image: this.user.imagedisplay
//           });
//         });
//       } else {
//         this.mode = "create";
//         this.userId = null;
//       }
//     });
//   }


//   onImagePicked(event: Event) {


//     const file = (event.target as HTMLInputElement).files[0];

//     this.form.get("file").setValue(file, { emitModelToViewChange: true });
//     this.form.patchValue({ image: file });
//     this.form.get("image").updateValueAndValidity();
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.imagePreview = reader.result;
//     };

//     reader.readAsDataURL(file);
//   }

//   onSavePost() {
//     if (this.form.invalid) {
//       return;
//     }
//     this.isLoading = true;
//     if (this.mode === "create") {
//       this.usersService.addPost(
//         this.form.value.name,
//         this.form.value.username,
//         this.form.value.image
//       );
//     } else {
//       this.usersService.updatePost(
//         this.userId,
//         this.form.value.name,
//         this.form.value.username,
//         this.form.value.image
//       );
//     }
//     this.form.reset();
//   }
// }
