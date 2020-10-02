import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryDrowDown, ImportantDates, Job, PostLinks } from 'src/app/models/job.model';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  job: Job = new Job();
  tempPostLink: PostLinks = new PostLinks();
  tempImpDate: ImportantDates = new ImportantDates();
  importantLinks: PostLinks[] = new Array<PostLinks>();
  importantDates: ImportantDates[] = new Array<ImportantDates>();
  dropDownCategory: CategoryDrowDown[] = new Array<CategoryDrowDown>();
  dataModel: any;
  // category: Job = new Job();
  jobToRevertChanges: Job = new Job();
  jobs: Job[];
  constructor(private dashboardService: AdminService, private spinner: NgxSpinnerService, private toster: ToastrService) {
    spinner.show();
  }

  ngOnInit(): void {
    this.dashboardService.getDropDownList().subscribe(res => {
      this.dropDownCategory = res;
    });
    this.dashboardService.getJobs().subscribe(result => {
      this.jobs = result;
      this.spinner.hide();
    });
  }
  deleteJob(job: Job): void {
    if (confirm(`do you want to delete Job: ${job.postName}?`)) {
      this.spinner.show();
      this.dashboardService.deleteJob(job).subscribe(res => {
        if (res.code === 200) {
          const index = this.jobs.findIndex(el => el.id === this.job.id);
          this.job.importantDates.splice(index, 1);
          this.toster.success('Status Updated', 'Success!');

        }
        this.spinner.hide();
      });
    }
  }

  loadJobToUpdate(job: Job): void {
    this.jobToRevertChanges = Object.assign(Object.create(job), job);
    this.job = Object.assign(Object.create(job), job);
    this.importantDates = job.importantDates;
    this.importantLinks = job.importantLinks;
  }
  public insertLink(link: PostLinks): void {
    if (link.title.trim() === '' || link.link.trim() === '') { return; }
    this.job.importantLinks.push(link);
    this.tempPostLink = new PostLinks();
  }
  public removePostLink(i: number): void {
    this.job.importantLinks.splice(i, 1);
  }
  public insertDate(dat: ImportantDates): void {
    if (dat.title.trim() === '' || dat.dateOrText.trim() === '') { return; }
    this.job.importantDates.push(dat);
    this.tempImpDate = new ImportantDates();
  }
  public removePostDate(j: number): void {
    this.job.importantDates.splice(j, 1);
  }
  public submitForm(jobForm: NgForm): void {
    if (jobForm.valid) {
      this.spinner.show();
      this.job.categoryId = Number(this.job.categoryId);
      this.job.importantDates = this.importantDates;
      this.job.importantLinks = this.importantLinks;
      this.dashboardService.updateJob(this.job).subscribe(response => {
        this.spinner.hide();
        if (response.code === 200) {
          this.toster.success(response.message, 'Success!');
          this.jobToRevertChanges = this.job;
          const index = this.jobs.findIndex(el => el.id === this.job.id);
          this.jobs[index] = this.job;
        } else if (response.code === 409) {
          this.job = this.jobToRevertChanges;
          this.toster.warning(response.message, 'Warning!');
        } else {
          this.job = this.jobToRevertChanges;
          this.toster.error(response.message, 'Error!');
        }
      });
    }
  }

}
