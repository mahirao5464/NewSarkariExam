import { Component, OnInit } from '@angular/core';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'newsarkariexam';
  isLogin: boolean=false;
  btnTxt: string = 'Login';
  rxSpace=/ /gi;
  rx = /-/gi;
  constructor(private firebaseservice: FireService) {

  }
  ngOnInit(): void {
    if(localStorage.getItem('jwt')!=undefined){
      this.isLogin = true;
      this.btnTxt = 'LogOut';
    }
    //this.firebaseservice.getuser().subscribe(result => console.log(result.forEach(x => console.log(x.payload.doc.data()))));
  }
  loginCheck(){
    if(this.isLogin){
      localStorage.removeItem('jwt');
      this.btnTxt = 'Login';
    }else{

    }
  }
}
