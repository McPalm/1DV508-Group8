import { CartEntry } from './cart-entry'

export class Order {
    name: string;
    address1: string;
    address2?: string;
    zip: number;
    city: string;
    cart: Array<CartEntry>;
    uid?: string;
    time?: string;
    userid?: string;
    status?: number;
    ordernumber?: number;
  }
