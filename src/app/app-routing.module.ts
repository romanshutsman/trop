import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate  } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';

import { MenuComponent } from './pages/menu/menu.component';
import { MenuDriverComponent } from './pages/menu-driver/menu-driver.component';
import { HomeComponent } from './pages/home/home.component';
import { DriverComponent } from './pages/driver/driver.component';
import { RegisterDriverComponent } from './pages/register-driver/register-driver.component';
import { OrdersForDriversComponent } from './pages/orders-for-drivers/orders-for-drivers.component';
import { RegisterUserComponent } from './pages/register-user/register-user.component';
import { LoginDriverComponent } from './pages/login-driver/login-driver.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { EditOrderComponent } from './pages/edit-order/edit-order.component';
import { EnterNumberComponent } from './pages/enter-number/enter-number.component';
import { ProfileDriverComponent } from './pages/profile-driver/profile-driver.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'driver', component: DriverComponent},
  {path: 'register-driver', component: RegisterDriverComponent},
  {path: 'login-driver', component: LoginDriverComponent},
  {path: 'register-user', component: RegisterUserComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'profile-driver', component: ProfileDriverComponent},
  {path: 'create-order', component: CreateOrderComponent},
  {path: 'edit-order', component: EditOrderComponent},
  {path: 'enter-number', component: EnterNumberComponent},
  {path: 'orders-for-drivers', component: OrdersForDriversComponent, canActivate: [AuthGuard]},
  {path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent}
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
  })
  
  export class AppRoutingModule { }