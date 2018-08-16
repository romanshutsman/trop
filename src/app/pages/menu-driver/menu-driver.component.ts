import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import {NgModule} from '@angular/core';
@Component({
  selector: 'app-menu-driver',
  templateUrl: './menu-driver.component.html',
  styleUrls: ['./menu-driver.component.scss']
})
export class MenuDriverComponent implements OnInit {

  constructor(public router: Router, private location: Location) { }

  ngOnInit() {
    console.log(this.router.url);
  }
  backClicked() {
    this.location.back();
  }
}
