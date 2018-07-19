import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  subscibeNews: FormGroup;
  constructor() { }

  ngOnInit() {
    this.subscibeNews = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }
  onSubmit() {
    
  }
}
