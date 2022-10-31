import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ETickets';
  
  constructor(private basketService: BasketService, private accountService: AccountService) {}
  
  ngOnInit(): void {
    this.getBasket();
    this.getCurrentUser();
  }

  getCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.getCurrentUser(token).subscribe({
      next: () => {
        console.log('user loaded');
      },
      error: error => console.log(error)
    })
  }
  
  getBasket() {
    const basketId = localStorage.getItem('basket_id');
    if(basketId) {
      this.basketService.getBasket(basketId).subscribe({
        next: () => {
          console.log('basket has been created');
        },
        error: error => console.log(error)
      })
    }
  }
}
