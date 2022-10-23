import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITicket } from 'src/app/shared/models/ITicket';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-ticket-page',
  templateUrl: './ticket-page.component.html',
  styleUrls: ['./ticket-page.component.scss']
})
export class TicketPageComponent implements OnInit {
  ticket: ITicket;

  constructor(private storeService: StoreService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    this.storeService.getTicket(+this.aRoute.snapshot.paramMap.get('id')).subscribe({
      next: (ticket) => this.ticket = ticket,
      error: (error) => console.log(error)
    })
  }

}
