import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingComponent } from './components/paging/paging.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';



@NgModule({
  declarations: [
    PagingComponent,
    PagingHeaderComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingComponent,
    PagingHeaderComponent
  ]
})
export class SharedModule { }
