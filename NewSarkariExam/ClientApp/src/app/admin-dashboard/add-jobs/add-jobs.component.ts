import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Job, PostLinks, ImportantDates, CategoryDrowDown } from '../../models/job.model';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {
  job: Job = new Job();
  tempPostLink: PostLinks = new PostLinks();
  tempImpDate: ImportantDates = new ImportantDates();
  importantLinks: PostLinks[] = new Array<PostLinks>();
  importantDates: ImportantDates[] = new Array<ImportantDates>();
  dropDownCategory: CategoryDrowDown[] = new Array<CategoryDrowDown>();
  dataModel: any;

  constructor(private dashboardService: AdminService, private toster: ToastrService) { }


  ngOnInit(): void {
    this.dashboardService.getDropDownList().subscribe(res => {
      this.dropDownCategory = res;
    });
  }
  public insertLink(link: PostLinks): void {
    if (link.title.trim() === '' || link.link.trim() === '') {return; }
    this.importantLinks.push(link);
    this.tempPostLink = new PostLinks();
  }
  public removePostLink(i: number): void {
    this.importantLinks.splice(i, 1);
  }
  public insertDate(dat: ImportantDates): void {
    if (dat.title.trim() === '' || dat.dateOrText.trim() === '') {return; }
    this.importantDates.push(dat);
    this.tempImpDate = new ImportantDates();
  }
  public removePostDate(j: number): void {
    this.importantDates.splice(j, 1);
  }
  public submitForm(jobForm: NgForm): void {
    if (jobForm.valid) {
      this.job.importantDates = this.importantDates;
      this.job.importantLinks = this.importantLinks;
      this.job.categoryId = Number(this.job.categoryId);
      this.dashboardService.addJob(this.job).subscribe(response => {
        console.log(response);
        if (response.code === 200) {
          this.toster.success(response.message, 'Success!');
        } else if (response.code === 409) {
          this.toster.warning(response.message, 'Warning!');
        } else {
          this.toster.error(response.message, 'Error!');
        }
      });
    }
  }
}
