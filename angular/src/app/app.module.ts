import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import {FlashMessagesModule, FlashMessagesService} from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { CoreModule } from './core/core.module';
import { CategoryService } from './services/category.service';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CookieService } from 'ngx-cookie-service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ItemService } from './services/item.service';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AdminComponent } from './admin/admin.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductListComponent } from './product-list/product-list.component';
import {MatGridListModule} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

import {NgbModule, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { NgbRadio, NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap/buttons/radio';
import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap/buttons/label';
import { ItemThumbNailComponent } from './gizmos/item-thumb-nail/item-thumb-nail.component';
import { DeleteproductComponent } from './deleteproduct/deleteproduct.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { SearchService } from './services/search.service';
import { CartService } from './services/cart.service';
import { OrderCatalogComponent } from './order-catalog/order-catalog.component';
import { OrderService } from './services/order.service';
import { EmailService } from './services/email.service';
import { BasketComponent } from './basket/basket.component';
import { AdressService } from './services/adress.service';
import { ItemdetailsComponent } from './itemdetails/itemdetails.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import {ItemCarouselComponent} from './item-carousel/item-carousel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HighlightButtonComponent } from './highlight-button/highlight-button.component';
import {ProductPageComponent} from "./product-page/product-page.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FrontpageComponent,
    AddcategoryComponent,
    AdminComponent,
    AddproductComponent,
    ProductListComponent,
    NavComponent,
    ItemThumbNailComponent,
    DeleteproductComponent,
    UpdateproductComponent,
    OrderCatalogComponent,
    BasketComponent,
    ItemdetailsComponent,
    UserprofileComponent,
    ItemCarouselComponent,
    HighlightButtonComponent,
    NavbarComponent,
    FrontpageComponent,
    ProductPageComponent
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
	  AngularFirestoreModule,
    AngularFireStorageModule,
	HttpClientModule,

  ],
  providers: [
    CategoryService,
    ItemService,
    NgbRadio,
    NgbButtonLabel,
    NgbRadioGroup,
    NgbAlert,
    CookieService,
    AdressService,
    SearchService,
    CartService,
    OrderService,
	EmailService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
