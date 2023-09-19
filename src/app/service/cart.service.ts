import { Injectable } from '@angular/core';
import { IProduct } from './product.service';
import { Subject } from 'rxjs';

export interface ICart {
  product: IProduct;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public afterAdd$: Subject<any> = new Subject();
  public cartList: ICart[] = [];
  public data: any;
  constructor() {
    this.initCartList();
  }

  clear(): void {
    this.cartList = [];
    this.data = null;
    this._updateChange();
  }

  getCartSimple(): any {
    let cartArray: any = { counts: [], products: [], total: 0 };
    cartArray.counts = this.cartList.map((ele) => ele.count);
    cartArray.products = this.cartList.map((ele) => ele.product.id);
    cartArray.total = this.cartList.reduce(
      (total, ele) => total + +ele.product.price,
      0
    );
    return cartArray;
  }

  add(product: IProduct): void {
    if (!product) return;
    let isProductExist = false;
    this.cartList = this.cartList.map((item) => {
      if (item.product.id === product.id) {
        item.count++;
        isProductExist = true;
      }
      return item;
    });
    if (!isProductExist && product.id)
      this.cartList.push({ product: product, count: 1 });
    this._updateChange();
  }

  remove(product: IProduct): void {
    if (!product) return;
    this.cartList = this.cartList
      .map((item) => {
        if (item.product.id === product.id) {
          item.count--;
        }
        return item;
      })
      .filter((item) => item.count > 0);
    this._updateChange();
  }

  removeProduct(product: IProduct): void {
    if (!product) return;
    this.cartList = this.cartList.filter((item) => item.product !== product);
    this._updateChange();
  }

  private _updateChange() {
    this._updateLocalStorage();
    this.afterAdd$.next(this.cartList);
  }

  private initCartList() {
    this.cartList = this._getCartList();
    setTimeout(() => {
      this.afterAdd$.next(this.cartList);
    }, 100);
  }

  private _getCartList(): ICart[] {
    const cartList = JSON.parse(window.localStorage.getItem('cartList'));
    if (cartList) {
      return cartList;
    }
    return [];
  }

  private _updateLocalStorage() {
    window.localStorage.removeItem('cartList');
    if (this.cartList.length > 0)
      window.localStorage.setItem('cartList', JSON.stringify(this.cartList));
  }
}
