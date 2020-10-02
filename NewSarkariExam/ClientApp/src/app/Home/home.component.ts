import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDesktop = false;
  constructor(private deviceDetector: DeviceDetectorService) { }

  ngOnInit(): void {
    this.isDesktop = this.deviceDetector.isDesktop();
  }

}
