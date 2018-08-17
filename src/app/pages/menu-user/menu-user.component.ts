import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {NgModule} from '@angular/core';

@Component({
  selector: 'app-menu-user',
  templateUrl: './menu-user.component.html',
  styleUrls: ['./menu-user.component.scss']
})
export class MenuUserComponent implements OnInit {

  constructor(public router: Router, private location: Location) { }

  ngOnInit() {
    console.log(this.router.url);
  }
  backClicked() {
    this.location.back();
  }
}
