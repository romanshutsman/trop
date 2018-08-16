import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router, RouterEvent, NavigationEnd, RoutesRecognized  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
import * as firebase from 'firebase';
import { filter, pairwise } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-profile-driver',
  templateUrl: './profile-driver.component.html',
  styleUrls: ['./profile-driver.component.scss']
})
export class ProfileDriverComponent implements OnInit {
  driverProfile: FormGroup;
  services = ['automotores', 'mudanza', 'maquinaria', 'objetos', 'mascotas', 'motocicleta', 'muebles', 'otros'];
  email = 'djhgfckudj@rhkf.jdj';
  number = 380934483929;
  numberAlternate = 380934483928;
  name = "Roman Shutsman Petrovich"
  constructor(private service:   SharedService, private fb: FormBuilder, private router: Router) {
    this.validationForm();
  }

  ngOnInit() {
    
  }
  validationForm() {
    this.driverProfile = new FormGroup({
      'name': new FormControl(null),
      'number': new FormControl(null),
      'number-alternative': new FormControl(null),
      'email': new FormControl(null),
      'password-driver': new FormControl(null),
      'description': new FormControl(null),
      'automotores': new FormControl(null),
      'mudanza': new FormControl(null),
      'maquinaria': new FormControl(null),
      'objetos': new FormControl(null),
      'mascotas': new FormControl(null),
      'motocicleta': new FormControl(null),
      'muebles': new FormControl(null),
      'otros': new FormControl(null),
      'otrosText': new FormControl(null)
    });
  }

  onSubmitCreate() {
    const data = this.driverProfile.value;
    this.router.navigateByUrl('/orders-for-drivers');
  }

}
