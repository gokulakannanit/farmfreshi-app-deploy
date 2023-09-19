import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CartService, ICart } from 'src/app/service/cart.service';
import { Util } from 'src/app/utils/util';
import { IProduct } from 'src/app/service/product.service';

@Component({
  selector: 'app-cart',
  template: `
    <span *ngIf="cartItem; else incrementer">
      <button mat-icon-button tabindex="0" [removeCart]="product">
        <mat-icon>remove_circle_outline</mat-icon>
      </button>
      <span>{{ cartItem.count }}</span>
      <button mat-icon-button tabindex="0" [addCart]="product">
        <mat-icon>add_circle_outline</mat-icon>
      </button>
    </span>
    <ng-template #incrementer>
      <button
        mat-raised-button
        color="primary"
        class="ml-1 mr-2"
        [addCart]="product"
      >
        <span *ngIf="mode !== 'simple'">Add to Cart</span>
        <mat-icon>add_shopping_cart</mat-icon>
      </button>
    </ng-template>
  `,
  styles: [
    `
      :host {
        min-width: 90px;
        text-align: center;
      }

      mat-icon {
        font-size: 20px;
        height: 20px;
        width: 20px;
      }
    `,
  ],
})
export class CartComponent implements OnInit, OnDestroy {
  @Input('product') product: IProduct;
  @Input('mode') mode: string = '';

  private cartList: ICart[] = [];

  public cartItem;

  constructor(private _cart: CartService) {}

  ngOnInit(): void {
    this.cartList = this._cart.cartList;
    this._cart.afterAdd$.pipe(Util.takeUntil(this)).subscribe((list) => {
      this.cartList = this._cart.cartList;
      this._updateCartItem();
    });
    this._updateCartItem();
  }

  ngOnDestroy() {}

  ngOnChanges() {
    this._cart.afterAdd$.next(this._cart.cartList);
  }

  private _updateCartItem(): any {
    this.cartItem = this.cartList.filter((item) => {
      return this.product && this.product.id === item.product.id;
    })[0];
  }
}
