import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public $afterCityCtrlLoaded: Subject<any> = new Subject();
  public cityData: any;
  constructor(private _http: HttpClient) {}

  getCityData() {
    return this._http.get('/assets/data/city.json');
  }
}
