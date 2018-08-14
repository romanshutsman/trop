import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router, RouterEvent, NavigationEnd, RoutesRecognized  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
import * as firebase from 'firebase';
import { filter, pairwise } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  selectedDate = '';
  selectedTime = '';
  locationFrom = '';
  locationTo = '';
  imagesThings = [];
  createOrder: FormGroup;
  date = ['Mañana', 'Tarde', 'Noche'];
  time = [
    '00:00', '00:30', '01:00', '01:30',
    '02:00', '02:30', '03:00', '03:30',
    '04:00', '04:30', '05:00', '05:30',
    '06:00', '06:30', '07:00', '07:30',
    '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30'];
services = ['automotores', 'mudanza', 'maquinaria', 'objetos', 'mascotas', 'motocicleta', 'muebles', 'otros'];
  constructor(private service:   SharedService, private fb: FormBuilder, private router: Router) {
    this.validationForm();
    // this.setLocation();
  }
  setLocation() {
    const interval = setInterval(() => {
      const data = localStorage.getItem('address');
      console.log(data);
      // console.log(data != null);
      if (data) {
        console.log(data);
        if (data != 'null') {
          if (data != 'undefined') {
            const d = {};
            d['dest_from'] = data;
            this.createOrder.patchValue(d);
            console.log(this.createOrder);
          }
        }
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
        localStorage.removeItem('address');
      } else {
        clearInterval(interval);
        localStorage.removeItem('address');
      }
    }, 10);
  }
  ngOnInit() {
    
  }
  validationForm() {
    this.createOrder = new FormGroup({
      'dest_from': new FormControl(null, [Validators.required]),
      'dest_to': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
      'time': new FormControl(null, [Validators.required]),
      'automotores': new FormControl(false),
      'mudanza': new FormControl(false),
      'maquinaria': new FormControl(false),
      'objetos': new FormControl(false),
      'mascotas': new FormControl(false),
      'motocicleta': new FormControl(false),
      'muebles': new FormControl(false),
      'otros': new FormControl(false),
      'otrosText': new FormControl(null, [Validators.minLength(2), Validators.maxLength(100)]),
      'images': new FormControl(null),
      'description': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(1200)])

    }, this.validationCheckbox);
  }
  validationCheckbox(g: FormGroup) {
    return g.get('automotores').value
    || g.get('mudanza').value
    || g.get('maquinaria').value
    || g.get('objetos').value
    || g.get('mascotas').value
    || g.get('motocicleta').value
    || g.get('muebles').value
    || (g.get('otros').value && g.get('otrosText').value)
    ? null : {'mismatch': true};
  }
  onSubmitCreate() {
    const data = this.createOrder.value;
    this.router.navigateByUrl('/orders-for-drivers');
  }
  getAddressOnChangeFrom(event) {
    this.locationFrom = '';
    // console.log(event.formatted_address);
    this.locationFrom = event.formatted_address;
    console.log(this.locationFrom);
    return event.formatted_address;
  }
  getAddressOnChangeTo(event) {
    this.locationTo = '';
    // console.log(event.formatted_address);
    this.locationTo = event.formatted_address;
    console.log(this.locationTo);
    return event.formatted_address;
  }
  onAddImages(event) {
    const file = event.srcElement.files;
    if (file[0]) {
      if (file[0].size <= 10485760) {
        if (event.target.files && event.target.files[0]) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            const url = e.target.result;
            this.imagesThings.push({url: url, file: file[0]});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      } else {
        alert('File size must be less than 10MB.');
      }
    }
  }
}
