import { Component, OnInit } from '@angular/core';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newsarkariexam';
  constructor(private firebaseservice: FireService) {

  }
  ngOnInit(): void {
    //this.firebaseservice.getuser().subscribe(result => console.log(result.forEach(x => console.log(x.payload.doc.data()))));
  }
}
