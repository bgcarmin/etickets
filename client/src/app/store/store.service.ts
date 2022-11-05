import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { IPaging, Paging } from '../shared/models/IPaging';
import { ISeat } from '../shared/models/ISeat';
import { ITicket } from '../shared/models/ITicket';
import { TicketParams } from '../shared/models/Params';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  apiUrl = 'https://localhost:5001/api/';
  tickets: ITicket[] = [];
  seats: ISeat[] = [];
  paging = new Paging();
  ticketParams: TicketParams = new TicketParams();
  ticketCache = new Map();

  constructor(private httpClient: HttpClient) { }

  getTickets(useCache: boolean) {

    if(useCache === false) {
      this.ticketCache = new Map();
    }

    if(this.ticketCache.size > 0 && useCache === true) {
      if(this.ticketCache.has(Object.values(this.ticketParams).join('-'))) {
        this.paging.items = this.ticketCache.get(Object.values(this.ticketParams).join('-'));
        return of(this.paging);
      }
    }

    let params = new HttpParams();

    // ako je u parametrima seat
    if(this.ticketParams.seatId !== 0) {
      params = params.append('seatId', this.ticketParams.seatId.toString());
    }

    // ako je u parametrima element za potragu
    if(this.ticketParams.search) {
      params = params.append('search', this.ticketParams.search);
    }

    params = params.append('sort', this.ticketParams.sort);
    params = params.append('pageNumber', this.ticketParams.pageNumber.toString());
    params = params.append('pageSize', this.ticketParams.pageSize.toString());

    return this.httpClient.get<IPaging>(this.apiUrl + 'tickets', { observe: 'response', params }).pipe(
      map(response => {
        this.ticketCache.set(Object.values(this.ticketParams).join('-'), response.body.items);
        this.paging = response.body;
        return this.paging;
      })
    );
  }

  setTicketParams(params: TicketParams) {
    this.ticketParams = params;
  }

  getTicketParams() {
    return this.ticketParams;
  }

  getSeats() {
    if(this.seats.length > 0) {
      return of(this.seats);
    }
    return this.httpClient.get<ISeat[]>(this.apiUrl + 'tickets/seats').pipe(
      map(res => {
        this.seats = res;
        return res;
      })
    );
  }

  getTicket(id: number) {
    let ticket: ITicket;
    this.ticketCache.forEach( (ticekts: ITicket[]) => {
      ticket = this.tickets.find(x => x.id === id);
    });

    if(ticket) {
      return of(ticket);
    }
    return this.httpClient.get<ITicket>(this.apiUrl + 'tickets/' + id);
  }
}
