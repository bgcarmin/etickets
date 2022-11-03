import {v4 as uuidv4} from 'uuid';

export interface IBasket {
    id: string;
    items: IBasketItem[];
    deliveryMethod?: number;
    shippingPrice?: number;
}

export interface IBasketItem {
    id: number;
    name: string;
    seat: string;
    price: number;
    photoUrl: string;
    dateTime: string;
    quantity: number;
  }

  export class Basket implements IBasket {
    id = uuidv4();
    items: IBasketItem[] = [];
  }

  export interface IBasketSum {
    shipping: number;
    subtotal: number;
    sum: number;
  }