import { Directive, Input, HostListener } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { IProduct } from 'src/app/service/product.service';

@Directive({
  selector: '[removeProduct]',
})
export class RemoveProductFromCartDirective {
  @Input('removeProduct') product: IProduct;

  constructor(private _cart: CartService) {}

  @HostListener('click', ['$event']) onClick(event): void {
    event.stopPropagation();
    this._cart.removeProduct(this.product);
  }
}
