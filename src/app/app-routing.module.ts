import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { DriverComponent } from './pages/driver/driver.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'driver', component: DriverComponent},
  {path: '**', component: HomeComponent}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule { }