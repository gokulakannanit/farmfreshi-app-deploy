import { Directive, Input, HostListener } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { IProduct } from 'src/app/service/product.service';

@Directive({
  selector: '[addCart]',
})
export class AddCartDirective {
  @Input('addCart') product: IProduct;

  constructor(private _cart: CartService) {}

  @HostListener('click', ['$event']) onClick(event): void {
    event.stopPropagation();
    this._cart.add(this.product);
  }
}
