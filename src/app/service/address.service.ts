import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Util } from '../utils/util';

export interface IAddress {
  id?: number;
  description?: string;
  matched_substrings?: [];
  place_id?: string;
  reference?: string;
  structured_formatting?: any;
  lng?: number;
  lat?: number;
  latandlng?: string;
  terms?: [];
  types?: [];
  title?: string;
  landmark?: string;
  cityId?: number;
  isPrimary?: any;
  mobile?: number;
  isLoading?: boolean;
  oldRecord?: IAddress;
  isSelected?: boolean;
  db?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private _bs: BaseService, private _http: HttpClient) {}

  getByMobile(mobile) {
    return this._bs.get(
      Util.API_URL + 'address/get/others/mobile/' + mobile,
      'address'
    );
  }

  delete(id) {
    return this._http.post(Util.API_URL + 'address/delete/' + id, '');
  }

  update(address: IAddress) {
    return this._http.post(Util.API_URL + 'address/update', address);
  }
}
