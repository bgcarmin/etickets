import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
// import { StoreModule } from './store/store.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NavbarComponent } from './core/navbar/navbar.component';
// import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

import { ExceptionInterceptor } from './core/interceptors/exception.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ExceptionInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
