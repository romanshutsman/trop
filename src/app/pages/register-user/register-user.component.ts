import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';
declare var FB: any;
declare var gapi: any;
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit, AfterViewInit {
  public auth2: any;
  registerUser: FormGroup;
  loginUser: FormGroup;
  displayLine = true;

  constructor(    private router: Router,
    private service:   SharedService,
    private auth:   AuthService) {
    this.validationRegisterUser();
    this.validationLoginUser();
   }

  ngOnInit() {
    this.googleInit();
  }
  validationRegisterUser() {
    const nameFormat = '[a-zA-Z ]*';
    const phoneFormat = '[0-9]';
    this.registerUser = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.pattern(nameFormat)
        ]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      // 'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      'repeatPassword': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    }, this.passwordRepeat);
  }
  validationLoginUser() {
    const nameFormat = '[a-zA-Z ]*';
    const phoneFormat = '[0-9]';
    this.loginUser = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }
  passwordRepeat(g: FormGroup) {
    return g.get('repeatPassword').value === g.get('password').value
    ? null : {'mismatch': true};
  }
  onSubmitReigsterUser() {
    const data = this.registerUser.value;
    const dataUser = {};
    this.auth.signUp(data.email, data.password);
    dataUser['email'] = data.email;
    dataUser['name'] = data.name;
    const interval = setInterval(() => {
      const user = firebase.auth().currentUser;
      console.log(user);
      if (user) {
        clearInterval(interval);
        const uid = user.uid;
        console.log(uid);
        firebase.database().ref('users/' + uid).update(dataUser);
        this.registerUser.reset();
        this.router.navigateByUrl('/dashboard-user');
      }
    }, 100);
  }
  onSubmitLoginUser() {
    const data = this.loginUser.value;
    this.auth.signIn(data.email, data.password);
    this.router.navigateByUrl('/dashboard-user');
  }
  showLine(e) {
    if (e == 2) {
      this.displayLine = true;
    } else {
      this.displayLine = false;
    }
  }
  RegisterFB() {

  }
  onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '159737933531-st2ss37g4dh7mcioc2l4r76o59t87mjl.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
    });
    
    gapi.signin2.render("div_tag_id", {
      "scope": "profile email ",
      "width": 277,
      "height": 44,
      "longtitle": true,
      "theme": "dark",
      "onsuccess": this.onGoogleLoginSuccess,
      
      "onfailure": function (e) {
          console.warn("Google Sign-In failure: " + e.error);
      }
  });
  }
  onGoogleLoginSuccess = (loggedInUser) => {
    const profile = loggedInUser.getBasicProfile();
           console.log(profile);
           console.log(loggedInUser);
           this.auth.registerGmail();
           this.router.navigateByUrl('/');
          }
  loginGmail() {
  }
  registerGmail() {
    this.auth.registerGmail();
    this.router.navigateByUrl('/');
  }
  ngAfterViewInit() {
    
  }
}
