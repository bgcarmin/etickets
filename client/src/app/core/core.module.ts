import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    NgxNavbarModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
