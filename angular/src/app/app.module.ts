import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';


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
import { ItemService } from './services/item.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AdminComponent } from './admin/admin.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductListComponent } from './product-list/product-list.component';
import {MatGridListModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FrontpageComponent,
    UserProfileComponent,
    AddcategoryComponent,
    AdminComponent,
    AddproductComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CoreModule,
    MatGridListModule,
    FlashMessagesModule.forRoot(),
    CdkTableModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  providers: [
    UserService,
    CategoryService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
