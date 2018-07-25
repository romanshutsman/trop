import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      console.log(data);
      console.log(data.uid);
    });
  }
}
