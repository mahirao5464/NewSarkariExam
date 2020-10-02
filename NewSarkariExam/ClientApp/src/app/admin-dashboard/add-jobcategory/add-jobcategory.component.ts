import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category.model';
import { AdminService } from '../admin.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-jobcategory',
  templateUrl: './add-jobcategory.component.html'
})
export class AddJobcategoryComponent implements OnInit {
category = new Category();
  constructor(private dashboardService: AdminService, private toster: ToastrService) { }

  ngOnInit(): void {
  }

public submitForm(categoryForm: NgForm ): void{
  if (categoryForm.valid){
  this.dashboardService.addCategory(this.category).subscribe(response  => {
    console.log(response);
    if (response.code === 200){
      this.toster.success( response.message, 'Success!' );
    }else if (response.code === 409 ){
      this.toster.warning( response.message, 'Warning!');
    } else {
      this.toster.error( response.message, 'Error!' );
    }
  });
 }
}
}
