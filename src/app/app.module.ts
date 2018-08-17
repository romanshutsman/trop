import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';

import { SharedService } from './services/shared.service';
import { AuthService } from './services/auth/auth.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { GoogleplaceDirective } from './directives/google-place.directive';

import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './pages/footer/footer.component';
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
import { MenuDriverComponent } from './pages/menu-driver/menu-driver.component';
import { MenuUserComponent } from './pages/menu-user/menu-user.component';
import { ProfileUserComponent } from './pages/profile-user/profile-user.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent,
    DriverComponent,
    RegisterDriverComponent,
    OrdersForDriversComponent,
    RegisterUserComponent,
    LoginDriverComponent,
    ForgotPasswordComponent,
    GoogleplaceDirective,
    DashboardUserComponent,
    PrivacyComponent,
    TermsComponent,
    CreateOrderComponent,
    EditOrderComponent,
    EnterNumberComponent,
    ProfileDriverComponent,
    MenuDriverComponent,
    MenuUserComponent,
    ProfileUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    RouterModule
  ],
  exports: [
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [ SharedService, AuthService, AuthGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
