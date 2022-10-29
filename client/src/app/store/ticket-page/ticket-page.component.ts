import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
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
  quantity = 1;

  constructor(private storeService: StoreService, private aRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService,
      private basketService: BasketService) {
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

  addTicketToBasket() {
    this.basketService.addTicketToBasket(this.ticket, this.quantity);
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }

}
