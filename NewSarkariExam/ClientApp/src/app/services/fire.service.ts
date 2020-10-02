import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  // constructor(private db : AngularFirestore) { }
  // getuser(){
  //   return this.db.collection("users").snapshotChanges();
  // }
}
