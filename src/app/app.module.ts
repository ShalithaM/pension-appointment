import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// common-widgets.module.ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar'


import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { NavBarComponent } from './components/common/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';

//Service files
import { Config } from './service/config'
import { CommonService } from './service/common.service'
import { PensionerService } from './service/pensioner.service'
import { AppointmentService } from './service/appointment.service'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  providers: [
    Config,
    CommonService,
    PensionerService,
    AppointmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
