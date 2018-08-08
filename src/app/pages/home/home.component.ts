import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { SharedService } from './../../services/shared.service';
import { AuthService } from './../../services/auth/auth.service';
import * as firebase from 'firebase';
declare var $: any;
import * as Typed from 'typed.js';
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  location: string;
  locationForm: FormGroup;
  subscribeApp: FormGroup;
  constructor(
    private router: Router,
    private service:   SharedService,
    private auth:   AuthService,
    private Platformlocation: PlatformLocation
  ) { 
    this.validationForm();
    this.location = '';
    this.validationFormApp();
    Platformlocation.onPopState(() => {
      $('#home').modal('hide');
  });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    const typed = new Typed("#typed", {
      strings: ["| tu oficina", "| tu bicicleta", "| tus muebles", "| tus mercaderías" ],
      typeSpeed: 30,
      backSpeed: 30,
      backDelay: 1000,
      startDelay: 1000,
      smartBackspace: false,
      loop: true
  });
  }
  typeWrite() {
    const TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        const elements = document.getElementsByClassName('typewrite');
        for (let i = 0; i < elements.length; i++) {
          const toRotate = elements[i].getAttribute('data-type');
          const period = elements[i].getAttribute('data-period');
            if (toRotate) {
              // console.log(JSON.parse(toRotate));
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        const css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #000}";
        document.body.appendChild(css);
    };
  }
  getAddressOnChange(event) {
    this.location = '';

    this.location = event.formatted_address;
    console.log(this.location);
    localStorage.setItem('address', this.location);
    return event.formatted_address;
  }
  validationForm() {
    this.locationForm = new FormGroup({
      'address': new FormControl(null)
    });
  }
  validationFormApp() {
    this.subscribeApp = new FormGroup({
      'email': new FormControl(null, [Validators.email, Validators.required])
    });
  }
  onSubmitLocation() {
    const data = this.locationForm.value;
    console.log(this.location);
    console.log(data.address);

    this.router.navigateByUrl('/create-order');
  }
  goToCreate() {
  }

  onSubmitSubscribeApp() {
    const data = this.subscribeApp.value;
    const date = new Date().getTime();
    const obj = {};
    obj[date] = data.email;
    $('#home').modal('hide');
    firebase.database().ref('/subscribeApp').update(obj);
    this.subscribeApp.reset();
  }
}
