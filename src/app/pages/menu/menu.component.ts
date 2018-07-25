import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);
  }

}
