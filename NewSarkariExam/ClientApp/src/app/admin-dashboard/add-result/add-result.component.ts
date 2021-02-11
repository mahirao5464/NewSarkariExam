import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServerApiService } from '../../shared/services/server-api.service';
import { Result } from '../../models/result.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html'
})
export class AddResultComponent implements OnInit {
    jobDropDown = new JobDropDown(1,'temp','cat');
         
    jobs = [
        
    ];
    
    result = new Result();
// category = new Category();
   constructor(private apiCall: ServerApiService, private toster: ToastrService) { }

  ngOnInit(): void {
    this.apiCall.getFrontEndJobs().subscribe(
        el => {
          if(el.statusCode == 200){
            console.log(el.jobs);
            el.jobs.forEach(element => {
                let jobDropDown = new JobDropDown(element.id,element.postShortName,element.category);
                // jobDropDown.value = ;
                // jobDropDown.text = ;
                // jobDropDown.category= ;
                this.jobs.push(
                    jobDropDown
                );
                
            });
          }
        }
      );
   }
   getResult(val:number): void{
    if(val>0){
        this.apiCall.getResultById(val).subscribe(res=>{
            console.log(res);
            if(res!=undefined){
                this.result = res;
            }else{
               this.result = new Result();
               this.result.jobId = val; 
            }
            
        });
    }
   }
 public submitForm(resultForm: NgForm ): void{
   if (resultForm.valid && this.result.jobId>0){
       this.result.jobId=Number(this.result.jobId);
       this.apiCall.addResult(this.result).subscribe(response=>{
        console.log(response);
        if(response.code === 200){
            this.toster.success( response.message, 'Success!' );
        }else if(response.code === 409 ){
            this.toster.warning( response.message, 'Warning!');
        }else{
            this.toster.error( response.message, 'Error!' );
        }
       })
  }else{
      alert("select job");
  }
 }
}
export class JobDropDown{

    value: number;
    text: string;
    category:string;
    selected? : number;
    /**
     *
     */
    constructor(value, text, category) {
        this.value = value;
        this.text = text;
        this.category = category;
    }
}