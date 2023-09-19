import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../utils/util';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public observable: Observable<any>[] = [];
  constructor(private _http: HttpClient, private ls: LocalStorageService) {}

  getLocal(name: string, filterBy: any = null) {
    let data = this.ls.get(name);
    data = filterBy ? Util.getValueById(data, filterBy) : data;
    return data;
  }

  get(url: string, name: string, filterBy: any = null): Observable<any> {
    let data = filterBy ? this.getLocal(name, filterBy) : null;
    if (data) {
      return of(data);
    } else if (!Util.isExist(this.observable, name)) {
      this.observable[name] = this._http
        .get<any>(url, {
          observe: 'response',
        })
        .pipe(
          map((response) => {
            if (response.status === 400) {
              return response;
            } else if (response.status === 200) {
              this.ls.set(name, response.body);
              const data = this.getLocal(name, filterBy);
              return data;
            }
          })
        );
    }
    return this.observable[name];
  }
}
