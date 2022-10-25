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
  ticketParams: TicketParams = new TicketParams();
  tickets: ITicket[];
  seats: ISeat[];
  count: Number;
  sorts = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Low to High Price', value: 'priceAsc'},
    {name: 'High to Low Price', value: 'priceDesc'}
    ]

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.getTickets();
    this.getSeats();
  }

  getTickets() {
    this.storeService.getTickets(this.ticketParams).subscribe({
      next: (res) => {
        this.tickets = res.items;
        this.ticketParams.pageNumber = res.pageNumber;
        this.ticketParams.pageSize = res.pageSize;
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
    this.ticketParams.sort = sortType;
    this.getTickets();
  }

  seatFilter(seatId: number) {
    this.ticketParams.seatId = seatId;
    this.getTickets();
  }

  searchFilter() {
    this.ticketParams.search = this.searchWord.nativeElement.value;
    this.ticketParams.pageNumber = 1;
    this.getTickets();
  }

  resetFilter() {
    this.searchWord.nativeElement.value = '';
    this.ticketParams = new TicketParams();
    this.getTickets();
  }

  pageChangeAction(event: any) {
    if(this.ticketParams.pageNumber !== event) {
      this.ticketParams.pageNumber = event;
      this.getTickets();
    }
  }


}
