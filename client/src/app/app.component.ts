import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ETickets';
  
  constructor(private basketService: BasketService) {}
  
  ngOnInit(): void {
    
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
