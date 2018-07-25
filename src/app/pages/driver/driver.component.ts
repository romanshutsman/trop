import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';
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
    'Terra do Fogo',
    'Tucumán'
  ];

  constructor(
    private router: Router,
    private service:   SharedService,
    private auth:   AuthService,
  ) { }

  ngOnInit() {
    this.validationForm();
  }
  validationForm() {
    const nameFormat = '[a-zA-Z ]*';
    const phoneFormat = '[0-9]';
    this.registerDriver = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.pattern(nameFormat)
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
}
