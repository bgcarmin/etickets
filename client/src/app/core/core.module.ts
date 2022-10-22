import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    NgxNavbarModule,
    CommonModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
