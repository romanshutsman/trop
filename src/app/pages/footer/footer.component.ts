import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import * as firebase from 'firebase';
declare var $: any;
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


  subscibeNews: FormGroup;
  subscribeApp: FormGroup;
  constructor(private Platformlocation: PlatformLocation) { 
    Platformlocation.onPopState(() => {
      $('#footer').modal('hide');
  });
  }

  ngOnInit() {
    this.validationFormApp();
    this.subscibeNews = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    const data = this.subscibeNews.value;
    const date = new Date().getTime();
    const obj = {};
    obj[date] = data.email;
    firebase.database().ref('/subscribeNews').update(obj);
    this.subscibeNews.reset();
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
    $('#footer').modal('hide');
    firebase.database().ref('/subscribeApp').update(obj);
    this.subscribeApp.reset();
  }
  goToTop() {
    window.scrollTo(0, 0);
  }
}
