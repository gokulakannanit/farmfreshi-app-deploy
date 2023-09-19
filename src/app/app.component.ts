import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './service/user.service';
import { Util } from './utils/util';
import { CommonService } from './service/common.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoggedIn: boolean = false;
  constructor(
    private _userService: UserService,
    private _common: CommonService
  ) {}

  ngOnInit(): void {
    const loader = document.querySelectorAll('.loading')[0] as HTMLElement;
    loader.style.display = 'none';
    const body = document.querySelectorAll('.mat-typography')[0] as HTMLElement;
    body.className = 'mat-typography';
    
    this.isLoggedIn = this._userService.user
      ? this._userService.user.isLoggedIn
      : false;
    this._userService.$loginTracker
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        this.isLoggedIn = this._userService.user
          ? this._userService.user.isLoggedIn
          : false;
      });

    this._common
      .getCityData()
      .pipe(Util.takeUntil(this))
      .subscribe((data: any) => {
        if (!data) return false;
        this._common.cityData = data;
        this._common.$afterCityCtrlLoaded.next(data);
      });
  }

  ngOnDestroy(): void {}
}
