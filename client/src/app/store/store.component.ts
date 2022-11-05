import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ISeat } from '../shared/models/ISeat';
import { ITicket } from '../shared/models/ITicket';
import { TicketParams } from '../shared/models/Params';
import { StoreService } from './store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  @ViewChild('search', {static: false}) searchWord: ElementRef;
  ticketParams: TicketParams;
  tickets: ITicket[];
  seats: ISeat[];
  count: Number;
  sorts = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Low to High Price', value: 'priceAsc'},
    {name: 'High to Low Price', value: 'priceDesc'}
    ]

  constructor(private storeService: StoreService) { 
    this.ticketParams = this.storeService.getTicketParams();
  }

  ngOnInit(): void {
    this.getTickets(true);
    this.getSeats();
  }

  getTickets(useCache = false) {
    this.storeService.getTickets(useCache).subscribe({
      next: (res) => {
        this.tickets = res.items;
        this.count = res.count;
      },
      error: (error) => console.log(error)
    });
  }

  getSeats() {
    this.storeService.getSeats().subscribe({
      next: (res) => {
        // nadodaje se default all sjedista za sva sjedista
        this.seats = [{id: 0, type: 'All', totalNumber: 0, availableNumber: 0}, ... res]
      }
    })
  }

  sortChange(sortType: string) {
    const params = this.storeService.getTicketParams();
    params.sort = sortType;
    this.storeService.setTicketParams(params);
    this.getTickets();
  }

  seatFilter(seatId: number) {
    const params = this.storeService.getTicketParams();
    params.seatId = seatId;
    params.pageNumber = 1;
    this.storeService.setTicketParams(params);
    this.getTickets();
  }

  searchFilter() {
    const params = this.storeService.getTicketParams();
    params.search = this.searchWord.nativeElement.value;
    params.pageNumber = 1;
    this.storeService.setTicketParams(params);
    this.getTickets();
  }

  resetFilter() {
    this.searchWord.nativeElement.value = '';
    this.ticketParams = new TicketParams();
    this.storeService.setTicketParams(this.ticketParams);
    this.getTickets();
  }

  pageChangeAction(event: any) {
    const params = this.storeService.getTicketParams();
    if(params.pageNumber !== event) {
      params.pageNumber = event;
      this.storeService.setTicketParams(params);
      this.getTickets(true);
    }
  }


}
