import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { TicketPageComponent } from './ticket-page/ticket-page.component';

const routes: Routes = [
  {path: '', component: StoreComponent},
  {path: ':id', component: TicketPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
