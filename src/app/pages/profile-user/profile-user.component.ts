import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';

import { AuthService } from './../../services/auth/auth.service';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  profileUser: FormGroup;
  name;
  email;
  number;
  numberAlternative;
  constructor(    private router: Router,
    private service:   SharedService,
    private auth:   AuthService) {
      this.validationProfileUser();
     }

  ngOnInit() {
    this.name = 'Roman Shutsman';
    this.email = 'roman1327555@gmail.com';
    this.number = '380934483929';
    this.numberAlternative = '380934483929';
  }
  validationProfileUser() {
    this.profileUser = new FormGroup({
      'name': new FormControl(null),
      'number': new FormControl(null),
      'number-alternative': new FormControl(null),
      'email': new FormControl(null),
      'password': new FormControl(null),
    });
  }
}
