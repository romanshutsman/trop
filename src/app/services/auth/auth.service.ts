import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  constructor() { }

  signUp(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      console.log(data);
      firebase.auth().currentUser.getToken()
      .then((token) => {
        localStorage.setItem('token', token);
      });
    });
  }
 signIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.getToken()
      .then((token) => {
        localStorage.setItem('token', token);
      });
    })
    .catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  isAuthenticated() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
