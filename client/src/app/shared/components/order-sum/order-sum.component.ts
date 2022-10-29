import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasketSum } from '../../models/basket';

@Component({
  selector: 'app-order-sum',
  templateUrl: './order-sum.component.html',
  styleUrls: ['./order-sum.component.scss']
})
export class OrderSumComponent implements OnInit {
  basketSum: Observable<IBasketSum>;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketSum = this.basketService.basketSum$;
  }

}
