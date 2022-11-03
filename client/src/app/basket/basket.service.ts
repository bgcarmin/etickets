import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketSum } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/IDeliveryMethod';
import { ITicket } from '../shared/models/ITicket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  apiUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSum = new BehaviorSubject<IBasketSum>(null);
  basketSum$ = this.basketTotalSum.asObservable();
  shipping = 0;

  constructor(private httpClient: HttpClient) { }

  getBasket(id: string) {
    return this.httpClient.get(this.apiUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasket());
        this.getTotals();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.httpClient.post(this.apiUrl + 'basket', basket).subscribe({
      next: (res: IBasket) => {
        this.basketSource.next(res);
        this.getTotals();
      },
      error: error => console.log(error)
    });
  }

  getCurrentBasket() {
    return this.basketSource.value;
  }

  addTicketToBasket(ticket: ITicket, quantity = 1) {
    const newTicket: IBasketItem = this.mapTicketToBasketItem(ticket, quantity);
    const basket = this.getCurrentBasket() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, newTicket, quantity);
    this.setBasket(basket);
  }

  increaseTicketQuantity(ticket: IBasketItem) {
    const basket = this.getCurrentBasket();
    const ticketIndex = basket.items.findIndex(x => x.id === ticket.id);
    basket.items[ticketIndex].quantity++;
    this.setBasket(basket);
  }

  decreaseTicketQuantity(ticket: IBasketItem) {
    const basket = this.getCurrentBasket();
    const ticketIndex = basket.items.findIndex(x => x.id === ticket.id);
    if(basket.items[ticketIndex].quantity > 1) {
      basket.items[ticketIndex].quantity--;
      this.setBasket(basket);
    }
    else {
      this.removeTicketFromBasket(ticket);
    }
  }

  removeTicketFromBasket(ticket: IBasketItem) {
    const basket = this.getCurrentBasket();
    if(basket.items.some(x => x.id === ticket.id)) {
      basket.items = basket.items.filter(t => t.id !== ticket.id);
      if(basket.items.length > 0) {
        this.setBasket(basket);
      }
      else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteBasket(basket: IBasket) {
    return this.httpClient.delete(this.apiUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSum.next(null);
        localStorage.removeItem('basket_id');
      },
      error: error => console.log(error)
    });
  }

  deleteBasketLocally(id: string) {
    this.basketSource.next(null);
    this.basketTotalSum.next(null);
    localStorage.removeItem('basket_id');
  }

  setShippingPrice(del: IDeliveryMethod) {
    this.shipping = del.price;
    const basket = this.getCurrentBasket();
    basket.deliveryMethod = del.id;
    basket.shippingPrice = del.price;
    this.getTotals();
    this.setBasket(basket);
  }

  private getTotals() {
    const currentBasket = this.getCurrentBasket();
    const shipping = 0;
    const subtotal = currentBasket.items.reduce( (x,y) => (y.price * y.quantity) + x, 0);
    const sum = subtotal + shipping;
    this.basketTotalSum.next({shipping, subtotal, sum});
  }

  private mapTicketToBasketItem(ticket: ITicket, quantity: number): IBasketItem {
    return {
      id: ticket.id,
      name: ticket.name,
      seat: ticket.seatLocation,
      price: ticket.price,
      photoUrl: ticket.photoUrl,
      dateTime: ticket.dateTime,
      quantity: quantity
    }
  }

  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private addOrUpdateItem(items: IBasketItem[], newItem: IBasketItem, quantity): IBasketItem[] {
    const itemIndex = items.findIndex(f => f.id === newItem.id);
    if(itemIndex === -1) {
      newItem.quantity = quantity;
      items.push(newItem);
    }
    else {
      items[itemIndex].quantity += quantity;
    }

    return items;
  }

}
