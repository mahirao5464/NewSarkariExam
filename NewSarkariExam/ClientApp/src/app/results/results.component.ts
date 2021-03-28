import { Component, OnInit } from '@angular/core';
import { ServerApiService } from '../shared/services/server-api.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  jobs: Array<any>;
  constructor(private apiCall: ServerApiService) { 
    
  }

  ngOnInit(): void {
    this.apiCall.getFrontEndJobs().subscribe(
      el => {
        if(el.statusCode == 200){
          console.log(el.jobs);
          this.jobs = el.jobs;
        }
      }
    );
  }
}
