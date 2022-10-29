import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basket = this.basketService.basket$;
  }

  removeBasketTicket(ticket: IBasketItem) {
    this.basketService.removeTicketFromBasket(ticket);
  }

  increaseTicketQuantity(ticket: IBasketItem) {
    this.basketService.increaseTicketQuantity(ticket);
  }

  decreaseTicketQuantity(ticket: IBasketItem) {
    this.basketService.decreaseTicketQuantity(ticket);
  }

}
