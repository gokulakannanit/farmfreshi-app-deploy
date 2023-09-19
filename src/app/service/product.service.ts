import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Util } from '../utils/util';
import { of } from 'rxjs';

export interface IProduct {
  id?: number;
  shortTitle: string;
  title: string;
  description: string;
  keywords?: string;
  unit: number;
  unitType: string;
  price: number;
  mrp: number;
  thumb: string;
  typeId: any;
  categoryId: any;
  inventory?: number;
  imageList?: string;
  state?: string;
  supplierId?: number;
  selected?: IProduct;
  options: any;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _bs: BaseService, private _http: HttpClient) {}

  getAll() {
    return this._bs.get(Util.API_URL + 'product/get/all', 'products');
  }

  getProductsByCategory(id: number) {
    return this._http.get(Util.API_URL + 'product/get/others/categoryId/' + id);
  }
}
