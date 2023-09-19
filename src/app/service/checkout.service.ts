import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../utils/util';
import { CartService } from './cart.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  public checkoutData: any;
  public $afterOrderPlaced: Subject<any> = new Subject();
  constructor(private _http: HttpClient, private _cart: CartService) {}

  placeOrder() {
    const { counts, products, total } = this._cart.getCartSimple();
    this._cart.data = {
      ...this.checkoutData,
      counts: counts.join(','),
      products: products.join(','),
      total: total,
    };
    return this._http.post(Util.API_URL + 'order/checkout', this._cart.data);
  }
}
