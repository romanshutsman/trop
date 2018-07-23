import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.scss']
})
export class RegisterDriverComponent implements OnInit {
  selected = '';
  registerDriver: FormGroup;
  registerDetails: FormGroup;
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
  validCbu = false;
  constructor() { }

  ngOnInit() {
    this.validationFormDriver();
    this.validationDetails();
  }
  validationFormDriver() {
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
  validationDetails() {
    this.registerDetails = new FormGroup({
      'cbu': new FormControl(null, [Validators.required, Validators.maxLength(22), Validators.minLength(22)]),
      'repeatCbu': new FormControl(null, [Validators.required, , Validators.minLength(22), Validators.maxLength(22)]),
      'cuil': new FormControl(null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      'bank': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)])
    }, this.cbuRepeat);
  }
  cbuRepeat(g: FormGroup) {
    console.log(g.get('cbu').value === g.get('repeatCbu').value);
    return g.get('cbu').value === g.get('repeatCbu').value
    ? null : {'mismatch': true};
}
  validationNumber(event: any) {
    const pattern = /[0-9\+\ ]/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  validationCuilCbu(event: any) {
    const pattern = /[0-9\ ]/;
  
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  submit1(){
    $('[href="#buzz"]').tab('show');
  }
  submit2(){
    $('[href="#references"]').tab('show');
  }
  valueProgressBar(percent) {
    const width = 'width:' + percent + '%';
    const progress = document.getElementById('progress');
    progress.setAttribute('style', width);
  }
  onSubmit() {
    const data = this.registerDriver.value;
    console.log(data);
  }
}