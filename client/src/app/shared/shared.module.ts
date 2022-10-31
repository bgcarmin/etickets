import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingComponent } from './components/paging/paging.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { OrderSumComponent } from './components/order-sum/order-sum.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PagingComponent,
    PagingHeaderComponent,
    OrderSumComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    PaginationModule,
    PagingComponent,
    PagingHeaderComponent,
    OrderSumComponent,
    BsDropdownModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
