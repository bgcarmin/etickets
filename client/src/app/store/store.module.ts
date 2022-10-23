import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoreComponent } from './store.component';
import { TicketItemComponent } from './ticket-item/ticket-item.component';
import { StoreRoutingModule } from './store-routing.module';
import { TicketPageComponent } from './ticket-page/ticket-page.component';



@NgModule({
  declarations: [
    StoreComponent,
    TicketItemComponent,
    TicketPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreRoutingModule
  ],
  exports: [
    StoreComponent
  ]
})
export class StoreModule { }
