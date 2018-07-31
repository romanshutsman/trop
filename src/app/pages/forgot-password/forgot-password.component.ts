import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPassword: FormGroup;
  constructor(
    private router: Router,
    private service:   SharedService,
    private auth:   AuthService,
  ) {
    this.validationForm();
  }

  ngOnInit() {
  }
  validationForm() {
    this.forgotPassword = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }
  onSubmitForgot() {
    const data = this.forgotPassword.value;
    firebase.auth().sendPasswordResetEmail(data.email)
    .then((success) => {
      console.log(success);
      alert('Please check your email!');
    })
    .catch((error) => {
      console.log(error);
    });
    this.forgotPassword.reset();
  }
}