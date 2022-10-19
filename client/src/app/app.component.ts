import { Component, OnInit } from '@angular/core';
import { ITicket } from './models/ITicket';
import { HttpClient } from '@angular/common/http';
import { IPaging } from './models/IPaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ETickets';
  tickets: ITicket[];
  
  constructor(private httpclient: HttpClient) {}
  
  ngOnInit(): void {
    
    this.httpclient.get('https://localhost:5001/api/tickets?pageSize=50').subscribe({
      next: (res: IPaging) => this.tickets = res.items,
      error: (error) => console.log(error)
    }
      
    );
  }
}
