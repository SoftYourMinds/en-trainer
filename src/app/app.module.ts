import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/main_components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/main_components/footer/footer.component';
import { LoginComponent } from './components/main_components/login/login.component';
import { RegistrationComponent } from './components/main_components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/materials/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { ImgLazyLoadComponent } from './shared/components/img-lazy-load/img-lazy-load.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { SignUpPageComponent } from './layouts/sign-up-page/sign-up-page.component';
import { LogInPageComponent } from './layouts/log-in-page/log-in-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    HomePageComponent,
    ImgLazyLoadComponent,
    SnackBarComponent,
    ProgressBarComponent,
    SignUpPageComponent,
    LogInPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
