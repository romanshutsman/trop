import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { DriverComponent } from './pages/driver/driver.component';
import { RegisterDriverComponent } from './pages/register-driver/register-driver.component';
import { OrdersForDriversComponent } from './pages/orders-for-drivers/orders-for-drivers.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginDriverComponent } from './pages/login-driver/login-driver.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'driver', component: DriverComponent},
  {path: 'register-driver', component: RegisterDriverComponent},
  {path: 'login-driver', component: LoginDriverComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'orders-for-drivers', component: OrdersForDriversComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule { }