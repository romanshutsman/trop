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
  dataForm;
  registerDriver: FormGroup;
  registerDetails: FormGroup;
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
name = '';
phone = '';
email = '';
password = '';
  validCbu = false;
  constructor(private service:   SharedService, private fb: FormBuilder) {
    this.validationFormDriver();
  }
  
  ngOnInit() {
    this.subscDriver = this.service.fillDriverForm.subscribe((data) => 
    {
      this.name = data['name'];
      this.phone = data['phone'];
      this.email = data['email'];
      this.selected = data['provincia'];
      this.password = data['password'];
      console.log(data);
      this.dataForm = data;
      this.fillform(data);
    }
  );
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
    console.log(this.registerDriver);
  }
  onSubmit() {
    const data = this.registerDriver.value;
    console.log(data);
  }
  fillform(data) {
    this.dataForm = data;
    console.log(this.dataForm);
    console.log(data);

    const name = data['name'];
    const phone = data['phone'];
    const email = data['email'];
    const provincias = data['provincia'];
    const password = data['password'];
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(provincias);
    console.log(password);

    const nameFormat = '[a-zA-Z ]*';
    const phoneFormat = '[0-9]';
    // this.registerDriver = this.fb.group({
    //   'name': new FormControl(name, [
    //     Validators.required,
    //     Validators.maxLength(50),
    //     Validators.minLength(5),
    //     Validators.pattern(nameFormat)
    //     ]),
    //   'email': new FormControl(email, [Validators.required, Validators.email]),
    //   'phone': new FormControl(phone, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    //   'provincia': new FormControl(provincias, [Validators.required ]),
    //   'password': new FormControl(password, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    // });
    // data = this.dataForm;
    // console.log(data);


    // this.registerDriver.controls['name'].setValue(data['name']);
    // this.registerDriver.controls['phone'].setValue(data['phone']);
    // this.registerDriver.controls['email'].setValue(data['email']);
    // this.registerDriver.controls['provincia'].setValue(data['provincia']);
    // this.registerDriver.controls['password'].setValue(data['password']);
    this.registerDriver.patchValue(data);
    // console.log('hello');
    console.log(this.registerDriver);
    
  }
  setValue() {
    console.log(this.registerDriver);
    console.log(this.dataForm);
    console.log(this.name);
    console.log(this.email);

  }
}
