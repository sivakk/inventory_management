
import { IssuesService } from './../issues.service';
import { UsersService } from '../users.service';
import { User } from "../user.model";
import { Component, OnInit, OnDestroy, OnChanges, AfterContentInit } from "@angular/core";
import { Issue } from "../issue";
import { Subscription, interval } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Times } from "../time";
import * as moment from "moment";
import { FormGroup, FormsModule, FormControl, Validators, AbstractControl } from "@angular/forms";

export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
  providers: [IssuesService]
})
export class PostListComponent implements OnInit, OnDestroy {
  private usersSub: Subscription;
  users: User[] = [];
  times: Times[] = [];
  issues: Issue[] = [];
  selectedValue: string;
  selectedCar: string;
  selectedissue: Issue;
  isLoading = false;
  today3: string = moment().format("MMMM Do YYYY");
  day: any = moment().format("hh:mm A");
  today5: any = moment().format('MMMM Do YYYY,h:mm A');
  date: any = moment().format('MMMM Do YYYY,h:mm A');
  today: any = moment().format("hh:mm A");
  time5: any = moment().format("hh:mm A ");
  today4: any = moment().format("hh:mm A");

  form: FormGroup;
  disableButton: any;
  users1: any;
  jobstarted: any;
  disableButton1: any;
  jobendtime: any;
  convert: any;
  jobdone: any;
  jobended: any;
  totaltime: any;
  imagePreview: any;
  jobstarttime: any;
  jobupdatedtimes: any;
  item: any;
  test: any;
  isLoading1 = false;
  list: any;
  options = [1, 2, 3];
  optionSelected: any;
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];


  constructor(
    private toastService: ToastrService,
    public usersService: UsersService,
    public IssuesService: IssuesService
  ) { }



  ngOnInit() {

    this.usersService.getsavedpost().subscribe((users: User[]) => {
      this.users1 = users;
      console.log(this.users1[0]);
      console.log(this.users1[0]._id);
      console.log(this.users1[0].image)
    })
    this.getonloadcopy();
    this.onloadcopy();
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.isLoading = true;
    this.usersService.getPosts();
    this.usersSub = this.usersService
      .getPostUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
        console.log(this.users[0].username);
        console.log(this.users[0].name);

        this.isLoading = false;
      });
  }

  async getonloadcopy() {
    return await this.IssuesService.getonload().subscribe(ele1 => {
      this.times = ele1;

      if (this.jobstarttime == undefined) {
        console.log("loading");

      }

      this.jobstarttime = this.times[0].jobstarttime;
      this.jobendtime = this.times[0].jobendtime;
      this.jobstarted = this.times[0].jobstarted;
      this.jobended = this.times[0].jobended;
      this.totaltime = this.times[0].jobdone;









      return this.jobstarttime, this.jobendtime, this.jobstarted, this.jobended,
        // var interval1 = setInterval(() => {





        this.IssuesService.getonload().subscribe(result => {
          let now1 = moment().format("MMMM Do YYYY");
          this.times = result;
          if (!this.jobended == true) {
            // this.jobendtime = this.times[0].jobendtime;
            var start = moment.utc(this.jobstarttime, "hh:mm");
            var end = moment.utc(this.today, "hh:mm ");
            if (end.isBefore(start)) end.add(0, "day");
            var d = moment.duration(end.diff(start));
            d.subtract(0, "minutes");
            this.totaltime = moment.utc(+d).format("H:mm");
            console.log(this.totaltime);
            this.IssuesService.totalTime(now1, this.totaltime).subscribe(result => {
              console.log(result);

            })
          }

        });

    });
  }


  async onloadcopy() {
    let now = moment().format("LLLL");
    this.IssuesService.onload(now, this.jobstarted, this.jobended, this.jobended, this.jobdone)
      .subscribe(ele => { this.list = ele; });
  }




  addIssues(form) {
    var newIsssue1 = form.value;
    this.IssuesService.addIssue(newIsssue1).subscribe(item => { this.getissues(); });
  }






  startClick() {
    this.jobstarted = true;


    this.IssuesService.updateonload(

      this.today3,
      this.jobstarted,
      this.day
    ).subscribe(result => {
      console.log("original item to be update with old values" + result);
    });
    var interval = setInterval(() => {
      this.getonloadcopy();

      clearInterval(interval);
    }, 1000);
    return (this.jobstarted = true)
  }


  stopClick() {
    this.jobended = true;
    this.isLoading1 = true;






    let now = moment().format("MMMM Do YYYY");
    let jobendtime: string = moment().format("hh:mm");;

    this.IssuesService.addstoptime(now, jobendtime, this.jobended).subscribe(result => {
      console.log("original item to be update with old values" + result);
    });



    var interval1 = setInterval(() => {





      this.IssuesService.getonload().subscribe(result => {
        let now1 = moment().format("MMMM Do YYYY");
        this.times = result;

        this.jobendtime = this.times[0].jobendtime;
        var start = moment.utc(this.jobstarttime, "hh:mm");
        var end = moment.utc(this.jobendtime, "hh:mm");
        if (end.isBefore(start)) end.add(0, "day");
        var d = moment.duration(end.diff(start));
        d.subtract(0, "minutes");
        this.totaltime = moment.utc(+d).format("H:mm");
        console.log(this.totaltime);
        this.IssuesService.totalTime(now1, this.totaltime).subscribe(result => {
          console.log(result);

        })

      });
      clearInterval(interval1);
      this.isLoading1 = false;

    }, 2000);






    return (this.jobstarted = true), this.jobended = true;
  }



  showSuccess() {
    this.toastService.success("issue raised successfully");
  }

  showInfo() {
    this.toastService.info("Not Added.");
  }

  onOptionSelected(event) {
    console.log(event); //option value will be sent as event
  }

  onImagePicked1(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  getissues() {
    this.IssuesService.getIssues().subscribe(items => {
      if (items) {
        this.issues = items;
        this.item = this.issues.length;
        this.showSuccess();
      } else {
        this.showInfo();
      }
    });
  }
  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
