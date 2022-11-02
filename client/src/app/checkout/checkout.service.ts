import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDeliveryMethod } from '../shared/models/IDeliveryMethod';
import { IOrderToCreate } from '../shared/models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  createOrder(order: IOrderToCreate) {
    return this.httpClient.post(this.apiUrl + 'orders', order);
  }

  getDeliveryMethods() {
    return this.httpClient.get(this.apiUrl + 'orders/deliveryMethods').pipe(
      map( (del: IDeliveryMethod[]) => {
        return del.sort( (a,b) => b.price - a.price);
      })
    )
  }
}
