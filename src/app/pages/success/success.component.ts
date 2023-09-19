import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/service/checkout.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css'],
})
export class SuccessComponent implements OnInit {
  public orderData: any = { tokenNo: '' };
  public cart: any;
  constructor(private _cart: CartService, private _router: Router) {}

  ngOnInit(): void {
    if (!this._cart.data) {
      this._router.navigateByUrl('/home');
    } else {
      this.orderData = this._cart.data;
      this.cart = this._cart.cartList;
      this._cart.clear();
      this._cart.afterAdd$.next('');
    }
  }

  print(): void {
    window.print();
  }

  get total(): number {
    return Util.getTotalCartPrice(this.cart);
  }
}
