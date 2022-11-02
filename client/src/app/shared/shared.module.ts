import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingComponent } from './components/paging/paging.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { OrderSumComponent } from './components/order-sum/order-sum.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component'



@NgModule({
  declarations: [
    PagingComponent,
    PagingHeaderComponent,
    OrderSumComponent,
    StepperComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule
  ],
  exports: [
    PaginationModule,
    PagingComponent,
    PagingHeaderComponent,
    OrderSumComponent,
    BsDropdownModule,
    ReactiveFormsModule,
    CdkStepperModule,
    BasketSummaryComponent,
    StepperComponent
  ]
})
export class SharedModule { }
