import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/shared/models/IOrder';

@Component({
  selector: 'app-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {
  order: IOrder;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav && nav.extras && nav.extras.state;
    if(state) {
      this.order = state as IOrder;
    }
  }

  ngOnInit(): void {
  }



}
