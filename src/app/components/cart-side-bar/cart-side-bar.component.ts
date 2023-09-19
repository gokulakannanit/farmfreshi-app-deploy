import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';
import { CartService, ICart } from 'src/app/service/cart.service';
import { Util } from 'src/app/utils/util';
import { Router } from '@angular/router';

@Component({
  selector: 'cart-content',
  templateUrl: './cart-side-bar.component.html',
  styleUrls: ['./cart-side-bar.component.css'],
})
export class CartSideBarComponent implements OnInit, OnDestroy {
  @Input() sidebar: boolean = false;
  @Output() closeme = new EventEmitter();
  public cartList: ICart[] = [];
  public cartUpdated: boolean = false;
  public deliveryCharge: number = 0;
  constructor(private _router: Router, private _cart: CartService) {}

  ngOnInit(): void {
    this.cartList = this._cart.cartList;
    this._cart.afterAdd$.pipe(Util.takeUntil(this)).subscribe((list) => {
      this.cartList = list;
      this.cartUpdated = true;
      this._updateDeliveryCharge();
      setTimeout(() => (this.cartUpdated = false), 300);
    });
  }

  ngOnDestroy() {}

  get total(): number {
    return Util.getTotalCartPrice(this.cartList);
  }

  onClose(proceed: boolean = false): void {
    if (proceed) this._router.navigateByUrl('/checkout');
    this.closeme.emit('');
  }

  private _updateDeliveryCharge() {
    const total = 0;
    if (total < 1000 && globalThis.appMode !== 'shop') {
      this.deliveryCharge = 20;
    }
  }
}
