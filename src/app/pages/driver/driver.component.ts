import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';
declare var $: any;
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  selected = '';
  registerDriver: FormGroup;
  provincia = [
    'Ciudad Autónoma de Buenos Aires',
    'Buenos Aires',
    'Catamarca',
    'Chaco',
    'Chubut',
    'Córdoba',
    'Corrientes',
    'Entre Ríos',
    'Formosa',
    'Jujuy',
    'La Pampa',
    'La Rioja',
    'Mendoza',
    'Misiones',
    'Neuquén',
    'Río Negro',
    'Salta',
    'San Juan',
    'San Luis',
    'Santa Cruz',
    'Santa Fe',
    'Santiago del Estero',
    'Tierra del Fuego',
    'Tucumán'
  ];
  subscribeApp: FormGroup;
  constructor(
    private router: Router,
    private service:   SharedService,
    private auth:   AuthService,
    private Platformlocation: PlatformLocation
  ) { 
    Platformlocation.onPopState(() => {
      $('#driver').modal('hide');
      console.log('pressed back!');

  });
  this.service.clicledButton.subscribe((data) => {
    console.log(data);
    if (data) {
      setTimeout(() => {          
        const elem = document.querySelector('#anchor');
        console.log(elem);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0);
    }
  })
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.validationForm();
    this.validationFormApp();
    console.log(this.service.clicledButton);
  }
  subscribeClick() {

  }
  validationForm() {
    const phoneFormat = '[0-9]';
    this.registerDriver = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
        ]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
      'provincia': new FormControl(null, [Validators.required ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }
validationNumber(event: any) {
  const pattern = /[0-9\+\ ]/;

  let inputChar = String.fromCharCode(event.charCode);
  if (event.keyCode != 8 && !pattern.test(inputChar)) {
    event.preventDefault();
  }
}
  onSubmit() {
    this.auth.isAuthenticated();
    const data = this.registerDriver.value;
    const refreshIntervalId = setInterval(() => {
      this.service.fillDriverForm.next(data);
    }, 1000);
    setTimeout(() => {
      clearInterval(refreshIntervalId);
    }, 5000);

    this.auth.signUp(data.email, data.password);
    this.registerDriver.reset();
    this.router.navigateByUrl('/register-driver');
  }
  goToRegister() {
    const elem = document.getElementById('anchor');
    elem.scrollIntoView({ behavior: 'smooth' });
  }
  validationFormApp() {
    this.subscribeApp = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required])
    });
  }
  onSubmitSubscribeApp() {
    const data = this.subscribeApp.value;
    const date = new Date().getTime();
    const obj = {};
    obj[date] = data.email;
    $('#driver').modal('hide');
    firebase.database().ref('/subscribeApp').update(obj);
    this.subscribeApp.reset();
  }
}
