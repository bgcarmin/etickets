import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';
import { IBasketSum } from '../shared/models/basket';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  basketSum: Observable<IBasketSum>;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketSum = this.basketService.basketSum$;
    this.createCheckoutForm();
    this.getAddress();
    this.getDeliveryMethod();
  }

  createCheckoutForm() {
    this.checkoutForm = this.formBuilder.group({
      addressForm: this.formBuilder.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        country: [null, Validators.required],
        zipCode: [null, Validators.required],
        city: [null, Validators.required],
        street: [null, Validators.required]
      }),
      deliveryForm: this.formBuilder.group({
        deliveryMethod: [null, Validators.required]
      }),
      paymentForm: this.formBuilder.group({
        nameOnCard: [null, Validators.required]
      })
    })
  }

  getAddress() {
    this.accountService.getUserAddress().subscribe({
      next: (a) => {
        if(a) {
        this.checkoutForm.get('addressForm').patchValue(a);
        }
      },
      error: error => console.log(error)
    });
  }

  getDeliveryMethod() {
    const basket = this.basketService.getCurrentBasket();
    if(basket.deliveryMethod !== null) {
      this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(basket.deliveryMethod.toString());
    }
  }

}
