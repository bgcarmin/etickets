import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUserOrders() {
    return this.httpClient.get(this.apiUrl + 'orders');
  }

  getOrderDetails(id: number) {
    return this.httpClient.get(this.apiUrl + 'orders/' + id);
  }
}
