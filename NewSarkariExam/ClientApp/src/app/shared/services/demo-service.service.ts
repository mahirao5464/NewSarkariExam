import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemoServiceService {
 demoOb = new Observable<boolean>();
 obsub:Subscription;
 
  constructor() { 
    
  }
}
