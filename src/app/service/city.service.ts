import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../utils/util';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

export interface ICity {
  id?: number;
  name: string;
  latandlng: string;
  zipcode: number;
  radius: number;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  public observable: Observable<any>;
  private cities: ICity;
  constructor(private _http: HttpClient, private _bs: BaseService) {}

  getCities(): Observable<any> {
    return this._bs.get(Util.API_URL + 'city/get/all', 'cities');
  }
}
