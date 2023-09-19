import { Component, OnInit, OnDestroy } from '@angular/core';
import { CheckoutService } from 'src/app/service/checkout.service';
import { Util } from 'src/app/utils/util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SUCCESS_MSG } from 'src/app/config/config';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css'],
})
export class PaymentGatewayComponent implements OnInit, OnDestroy {
  selectedPaymentMode: string = 'cash';
  constructor(
    private _checkoutService: CheckoutService,
    private _snackBar: MatSnackBar,
    private _cart: CartService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  placeOrder(): void {
    this._checkoutService
      .placeOrder()
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data: any) => {
          this._cart.data.id = data;
          this._snackBar.open(SUCCESS_MSG.ORDER_PLACED, null, {
            duration: 2000,
          });
          this._checkoutService.$afterOrderPlaced.next();
          this._router.navigateByUrl('/success');
        },
        (error) => {}
      );
  }
}
