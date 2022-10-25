import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from 'src/app/shared/models/ITicket';
import { BreadcrumbService } from 'xng-breadcrumb';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  ticket: ITicket;

  constructor(private storeService: StoreService, private aRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.set('@ticketPage', ' ')
   }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.storeService.getTicket(+this.aRoute.snapshot.paramMap.get('id')).subscribe({
      next: (ticket) => { 
        this.ticket = ticket; 
        this.breadcrumbService.set('@ticketPage', ticket.name); 
      },
      error: (error) => console.log(error)
    })
  }

}
