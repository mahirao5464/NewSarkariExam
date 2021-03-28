import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ServerApiService } from '../shared/services/server-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  jobs: Array<any>;
  results: Array<any>;
  isDesktop = false;
  constructor(private deviceDetector: DeviceDetectorService, private apiCall: ServerApiService) { 

  }

  ngOnInit(): void {
    this.isDesktop = this.deviceDetector.isDesktop();
    this.apiCall.getFrontEndJobs(10).subscribe(
      el => {
        if(el.statusCode == 200){
          console.log(el.jobs);
          this.jobs = el.jobs;
          this.results=el.results;
        }
      }
    );
  }

}
