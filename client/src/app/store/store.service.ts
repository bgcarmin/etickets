import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IPaging } from '../shared/models/IPaging';
import { ISeat } from '../shared/models/ISeat';
import { ITicket } from '../shared/models/ITicket';
import { TicketParams } from '../shared/models/Params';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  apiUrl = 'https://localhost:5001/api/';

  constructor(private httpClient: HttpClient) { }

  getTickets(ticketParams: TicketParams) {
    let params = new HttpParams();

    // ako je u parametrima seat
    if(ticketParams.seatId !== 0) {
      params = params.append('seatId', ticketParams.seatId.toString());
    }

    // ako je u parametrima element za potragu
    if(ticketParams.search) {
      params = params.append('search', ticketParams.search);
    }

    params = params.append('sort', ticketParams.sort);
    params = params.append('pageNumber', ticketParams.pageNumber.toString());
    params = params.append('pageSize', ticketParams.pageSize.toString());

    return this.httpClient.get<IPaging>(this.apiUrl + 'tickets', { observe: 'response', params }).pipe(
      map(response => {
        return response.body;
      })
    );
  }

  getSeats() {
    return this.httpClient.get<ISeat[]>(this.apiUrl + 'tickets/seats');
  }

  getTicket(id: number) {
    return this.httpClient.get<ITicket>(this.apiUrl + 'tickets/' + id);
  }
}
