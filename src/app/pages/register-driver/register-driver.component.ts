import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
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
  uploadImages: FormGroup;
  subscDriver: Subscription;
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
  showHeader = true;
  personal = [];
  vehicle = [];
  license = [];

  constructor(private service:   SharedService, private fb: FormBuilder) {
    this.validationFormDriver();
    this.validationDetails();
    this.validationImage();
  }
  
  ngOnInit() {
    this.subscDriver = this.service.fillDriverForm.subscribe((data) => this.fillform(data));

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
  validationImage() {
    this.personal = [];
    this.vehicle = [];
    this.license = [];
    this.uploadImages = new FormGroup({
      'personal': new FormControl(null),
      'vehicle': new FormControl(null),
      'license': new FormControl(null)
    });
  }
  cbuRepeat(g: FormGroup) {
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
  submit1() {
    $('[href="#buzz"]').tab('show');
  }
  submit2() {
    $('[href="#references"]').tab('show');
  }
  valueProgressBar(percent) {
    if (percent == 100) {
      this.showHeader = false;
    } else {
      this.showHeader = true;
    }
    const width = 'width:' + percent + '%';
    const progress = document.getElementById('progress');
    progress.setAttribute('style', width);
  }
  onSubmit() {
    const data = this.registerDriver.value;
  }
  fillform(data) {
    this.registerDriver.patchValue(data);
  }
  onAddPersonal(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 2228571) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.personal.push({url: url});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 2MB.');
      }
    }
  }
  onAddVehicle(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 2228571) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.vehicle.push({url: url});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 2MB.');
      }
    }
  }
  onAddLicense(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 2228571) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.license.push({url: url});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 2MB.');
      }
    }
  }
}
