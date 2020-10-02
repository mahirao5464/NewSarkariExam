import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Category } from 'src/app/models/category.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {
  category: Category = new Category();
  categoryToRevertChanges: Category= new Category();
  categories: Category[];
  constructor(private dashboardService: AdminService, private spinner: NgxSpinnerService, private toster: ToastrService) {
    spinner.show();
   }

  ngOnInit(): void {
    this.dashboardService.getCategories().subscribe(result => {
      this.categories = result;
      this.spinner.hide();
    });
  }
  deleteCategory(category: Category): void {
  if ( confirm(`do you want to delete category: ${category.name}?
      NOTE: All the jobs will be disappeared of this category.`) ) {
        this.spinner.show();
        category.categoryStatus = !category.categoryStatus;
        this.dashboardService.deleteCategory(category).subscribe(res => {
      if (res.code === 200){
        this.toster.success('Status Updated', 'Success!');
      }
      this.spinner.hide();
    });
   }
  }

  loadCategoryToUpdate(cat: Category): void {
    this.categoryToRevertChanges = Object.assign(Object.create(cat), cat);
    this.category = Object.assign(Object.create(cat), cat);
  }
  public submitForm(categoryForm: NgForm ): void{
    if (categoryForm.valid){
    this.dashboardService.updateCategory(this.category).subscribe(response  => {
      console.log(response);
      if (response.code === 200){
        this.toster.success( response.message, 'Success!' );
        this.categoryToRevertChanges = this.category;
        const index = this.categories.findIndex(el=> el.id === this.category.id);
        this.categories[index] = this.category;
      }else if (response.code === 409 ){
        this.category = this.categoryToRevertChanges;
        this.toster.warning( response.message, 'Warning!');
      } else {
        this.category = this.categoryToRevertChanges;
        this.toster.error( response.message, 'Error!' );
      }
    });
   }
  }
}
