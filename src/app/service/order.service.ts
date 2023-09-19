import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../utils/util';
import { UserService } from './user.service';

export interface IOrder {
  id?: number;
  products: string;
  counts: string;
  deliveryDate?: string;
  cancelling?: boolean;
  expanded?: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _http: HttpClient, private _user: UserService) {}

  getOrder(index) {
    let fullUrl = 'order/' + ['upcoming/', 'delivered/'][index];
    return this._http.get(Util.API_URL + fullUrl + this._user.user.mobile);
  }

  cancelOrder(id) {
    return this._http.post(Util.API_URL + 'order/cancel/' + id, '');
  }
}
