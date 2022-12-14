import { outputAst } from '@angular/compiler';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem, IBasketSum } from '../../models/basket';
import { IOrderItem } from '../../models/IOrder';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  // basket$: Observable<IBasket>;
  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket = true;
  @Input() isOrder = false; 
  @Input() items: IBasketItem[] | IOrderItem[] = [];

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    // this.basket$ = this.basketService.basket$;
  }

  decreaseTicketQuantity(item: IBasketItem) {
    this.decrement.emit(item);
  }

  increaseTicketQuantity(item: IBasketItem) {
    this.increment.emit(item);
  }

  removeBasketTicket(item: IBasketItem) {
    this.remove.emit(item);
  }

}
