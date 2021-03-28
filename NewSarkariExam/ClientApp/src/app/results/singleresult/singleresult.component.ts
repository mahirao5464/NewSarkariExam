import { AnimationDriver } from '@angular/animations/browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Job } from 'src/app/models/job.model';
import { ServerApiService } from 'src/app/shared/services/server-api.service';

@Component({
  selector: 'app-singleresult',
  templateUrl: './singleresult.component.html',
  styleUrls: ['./singleresult.component.css']
})

export class SingleresultComponent implements OnInit {
  Jobs: Array<any>;
  ShowJobList= false;
  CategoryFound= true;
  singleJob: Job = new Job();
  postedOn: any;
  updatedOn:any;
  categoryName: string="";
  parameterCategory: string;
  jobName: string = "";
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiCall: ServerApiService,
    private spinner: NgxSpinnerService
    ) {
      //alert('hi');
    }
    getDateFormat(value: Date){
      
    }
ngOnInit() {
  
   let jobname = this.route.snapshot.paramMap.get('id');
  let jobcat = this.route.snapshot.paramMap.get('cat');
  let rx = /-/gi;
  this.parameterCategory = jobcat;
  this.ShowJobList = jobname == null ? true:false; 
  this.spinner.show();
    this.apiCall.getJobDetailByCatNJob(jobcat,jobname).subscribe(el=>{
      this.spinner.hide();
        if(el.statusCode === 200){
         this.CategoryFound=true;
          this.Jobs = el.jobs;
          if(jobname!=null){
            this.jobName=jobname.replace(rx,' ');
            this.singleJob=el.jobs[0];
            this.postedOn= new Date(this.singleJob.postedOn).toDateString();
            this.updatedOn = new Date(this.singleJob.lastUpdatedOn).toDateString();
            this.categoryName = this.singleJob.category.name;
            console.log(this.singleJob);
          }
          
      } 
      else{
        this.CategoryFound=false;

        

      }    
    });
   
  // if(jobname!=null){
  //   this.apiCall.getJobDetailByCatNJob(jobcat,jobname).subscribe(el=>
  //     {
  //       console.log(el);
  //     });
  // }else{
  //   alert('fetch category');
  // }
   console.log('mahipal'+jobcat + jobname);
}

}
