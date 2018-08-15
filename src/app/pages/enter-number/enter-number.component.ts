import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder, NgForm  } from '@angular/forms';
import { RouterModule, Routes, Router, RouterEvent, NavigationEnd, RoutesRecognized  } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from './../../services/shared.service';
import * as firebase from 'firebase';
import { filter, pairwise } from 'rxjs/operators';
declare var $: any;

@Component({
  selector: 'app-enter-number',
  templateUrl: './enter-number.component.html',
  styleUrls: ['./enter-number.component.scss']
})
export class EnterNumberComponent implements OnInit {
  createOrder: FormGroup;
  countryCode = ['+54 (Argentina)'];
  selectedCode1 = this.countryCode[0];
  selectedCode2 = this.countryCode[0];

  constructor(private service:   SharedService, private fb: FormBuilder, private router: Router) {
    this.validationForm();
  }

  ngOnInit() {
    
  }
  validationForm() {
    this.createOrder = new FormGroup({
      'number': new FormControl(null, [Validators.required]),
      'number_alternative': new FormControl(null),
      'code1': new FormControl(null, [Validators.required]),
      'code2': new FormControl(null)

    });
  }

  onSubmitCreate() {
    const data = this.createOrder.value;
    this.router.navigateByUrl('/orders-for-drivers');
  }

}
