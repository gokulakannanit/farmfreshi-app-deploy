import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Util } from '../utils/util';
import { Subject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AddressService } from './address.service';
import { LocationService } from './location.service';

export interface IUser {
  id?: string;
  mobile: number;
  pin: number;
  newPin?: number;
  fullname?: string;
  email?: string;
  isFirst?: number;
  isLoggedIn?: boolean;
  avatar?: string;
  gender?: string;
  secondaryContact?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public $loginTracker: Subject<any> = new Subject();
  public user: IUser;
  constructor(
    private _http: HttpClient,
    private _address: AddressService,
    private _location: LocationService,
    private _localStorage: LocalStorageService
  ) {
    this.setUser(this._localStorage.get('user'));
  }

  setUser(data) {
    this._localStorage.set('user', null);
    this.user = null;
    if (data) {
      this._localStorage.set('user', data);
      this.user = data;
      this.user.isLoggedIn = true;
      this.loadAddress();
    }

    this.$loginTracker.next(this.user);
  }

  logout() {
    this.setUser(null);
    window.location.href = '/home';
    return this._http.get(Util.API_URL + '/session/logout');
  }

  isExist(data) {
    return this._http.post(Util.API_URL + 'user/isExist', data);
  }

  sendOtp(data) {
    return this._http.post(Util.API_URL + 'user/sendOtp', data);
  }

  verifyOtp(data) {
    return this._http.post(Util.API_URL + 'user/verifyOtp', data);
  }

  verify(data) {
    return this._http.post(Util.API_URL + 'user/verify', data);
  }

  update(data) {
    return this._http.post(Util.API_URL + 'user/update', data);
  }

  changePin(data) {
    data.id = this.user.id;
    data.mobile = this.user.mobile;
    return this._http.post(Util.API_URL + 'user/changePin', data);
  }

  forgotPassword(data) {
    return this._http.post(Util.API_URL + 'user/forgotPin', data);
  }

  loadAddress(): void {
    if (!this._location.get()) {
      this._address.getByMobile(this.user.mobile).subscribe((data) => {
        if (data) this._location.loadFromAddressBook(data);
      });
    }
  }
}
