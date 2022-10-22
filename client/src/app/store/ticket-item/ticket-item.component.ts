import { Component, Input, OnInit } from '@angular/core';
import { ITicket } from 'src/app/shared/models/ITicket';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: ITicket;

  constructor() { }

  ngOnInit(): void {
  }

}
