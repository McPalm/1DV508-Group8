import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { UserService } from './services/user.service';
import { CoreModule } from './core/core.module';
import { CategoryService } from './services/category.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FrontpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CoreModule,

  ],
  providers: [
    UserService,
    CategoryService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
