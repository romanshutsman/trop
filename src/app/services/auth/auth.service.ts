import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';
declare var FB: any;
declare var gapi: any;
@Injectable()
export class AuthService {
  public auth2: any;
  
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
  initGmail() {

  }
  loginGmail() {
      const profileUser = {};
      const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
      const token = googleUser.getAuthResponse().id_token;
      if (token) {
        localStorage.setItem('token', token);
      }
      const profile = googleUser.getBasicProfile();
      console.log(profile);
      const googleId = profile.getId();
  }
  registerGmail() {
    const profileUser = {};
    const googleUser = gapi.auth2.getAuthInstance().currentUser.get();
    const token = googleUser.getAuthResponse().id_token;
    if (token) {
      localStorage.setItem('token', token);
    }
    const profile = googleUser.getBasicProfile();
    const googleId = profile.getId();
    if (googleId) {
      profileUser['googleId'] = googleId;
      profileUser['name'] = profile.getName();
      profileUser['email'] = profile.getEmail();
      profileUser['photo'] = profile.getImageUrl();
      console.log(profileUser);
      const key = firebase.database().ref('/users').push().key;
      firebase.database().ref('/users/' + key).update(profileUser);
    }
  }
}
