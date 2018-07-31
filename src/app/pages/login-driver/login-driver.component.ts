import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login-driver',
  templateUrl: './login-driver.component.html',
  styleUrls: ['./login-driver.component.scss']
})
export class LoginDriverComponent implements OnInit {
  loginDriver: FormGroup;
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
    const nameFormat = '[a-zA-Z ]*';
    const phoneFormat = '[0-9]';
    this.loginDriver = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }
  onSubmitLoginDriver() {
    const data = this.loginDriver.value;
    this.auth.signIn(data.email, data.password);
    this.router.navigateByUrl('/');
  }
}

