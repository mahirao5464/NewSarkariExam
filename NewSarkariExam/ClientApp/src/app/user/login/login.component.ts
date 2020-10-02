import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/admin-dashboard/admin.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  userModel: User = new User();
  constructor(private dashboardService: AdminService, private toster: ToastrService ) { }

  ngOnInit(): void {
  }
 login(loginForm: NgForm){
    if(loginForm.valid){
      this.dashboardService.login(this.userModel).subscribe(res => {
        console.log(res);
      });
    }
 }
}
