import { IAddress } from "./IAddress"

export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subtotal: number;
    total: number;
    status: string;
  }

  export interface IOrderItem {
    ticketId: number;
    ticketName: string;
    photoUrl: string;
    price: number;
    quantity: number;
  }

  export interface IOrderToCreate {
    basketId: string;
    deliveryMethod: number;
    shipToAddress: IAddress;
  }