import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators  } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {


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
