import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreComponent } from './store.component';
import { TicketItemComponent } from './ticket-item/ticket-item.component';



@NgModule({
  declarations: [
    StoreComponent,
    TicketItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
