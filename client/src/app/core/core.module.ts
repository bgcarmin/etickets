import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { SubtitleComponent } from './subtitle/subtitle.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NavbarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    SubtitleComponent
  ],
  imports: [
    NgxNavbarModule,
    CommonModule,
    RouterModule,
    SharedModule,
    BreadcrumbModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    })
  ],
  exports: [
    NavbarComponent,
    SubtitleComponent
  ]
})
export class CoreModule { }
