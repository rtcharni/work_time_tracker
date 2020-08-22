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
import { ListworkentriesComponent } from './shared-components/listworkentries/listworkentries.component';
import { EditworkentrybottomsheetComponent } from './shared-components/listworkentries/editworkentrybottomsheet/editworkentrybottomsheet.component';
import { EditworkentryformComponent } from './shared-components/listworkentries/editworkentryform/editworkentryform.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UserformComponent } from './shared-components/userform/userform.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { ResetpasswordPageComponent } from './pages/resetpassword-page/resetpassword-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MessagingPageComponent } from './pages/messaging-page/messaging-page.component';
import { WorkentryExpansionContentComponent } from './pages/messaging-page/workentry-expansion-content/workentry-expansion-content.component';
import { WorkmessagesTabComponent } from './pages/messaging-page/workmessages-tab/workmessages-tab.component';

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
    UserformComponent,
    NotfoundPageComponent,
    ResetpasswordPageComponent,
    ProfilePageComponent,
    MessagingPageComponent,
    WorkentryExpansionContentComponent,
    WorkmessagesTabComponent,
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
