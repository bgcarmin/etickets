import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { ITicket } from 'src/app/shared/models/ITicket';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: ITicket;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }
  
  addTicketToBasket() {
    this.basketService.addTicketToBasket(this.ticket);
  }

}
