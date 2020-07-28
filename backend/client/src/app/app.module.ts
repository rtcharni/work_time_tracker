import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../modules/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FrontPageComponent } from './pages/front-page/front-page.component';
import { WorkEntryPageComponent } from './pages/workentry-page/workentry-page.component';
import { AddworkentryComponent } from './pages/workentry-page/addworkentry/addworkentry.component';
import { ListworkentriesComponent } from './pages/workentry-page/listworkentries/listworkentries.component';
import { EditworkentrybottomsheetComponent } from './pages/workentry-page/listworkentries/editworkentrybottomsheet/editworkentrybottomsheet.component';
import { EditworkentryformComponent } from './pages/workentry-page/listworkentries/editworkentryform/editworkentryform.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FrontPageComponent,
    WorkEntryPageComponent,
    AddworkentryComponent,
    ListworkentriesComponent,
    EditworkentrybottomsheetComponent,
    EditworkentryformComponent,
    AdminPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    EditworkentrybottomsheetComponent,
    EditworkentryformComponent,
  ],
})
export class AppModule {}
