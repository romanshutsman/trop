import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

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
        this.router.navigateByUrl('/');
      }
    }, 100);
  }
  onSubmitLoginUser() {
    const data = this.loginUser.value;
    this.auth.signIn(data.email, data.password);
    this.router.navigateByUrl('/');
  }
  showLine(e) {
    if (e == 2) {
      this.displayLine = true;
    } else {
      this.displayLine = false;
    }
  }
}
