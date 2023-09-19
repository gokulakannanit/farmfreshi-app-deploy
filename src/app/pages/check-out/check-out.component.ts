import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CartService, ICart } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { MatVerticalStepper } from '@angular/material/stepper';
import { CheckoutService } from 'src/app/service/checkout.service';
import { UserService, IUser } from 'src/app/service/user.service';
import { ScheduleDeliveryComponent } from 'src/app/components/schedule-delivery/schedule-delivery.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatVerticalStepper;
  @ViewChild('deliverySlot') deliverySlot: ScheduleDeliveryComponent;

  public cartList: ICart[];
  public user: IUser;
  public mobile: number;
  public isLoading: boolean = false;
  public errorMessage: string;
  public isLoggedIn: boolean = false;
  public checkoutData: any = {};

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _cartService: CartService,
    private _checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.cartList = this._cartService.cartList;

    this._cartService.afterAdd$.pipe(Util.takeUntil(this)).subscribe(() => {
      this.cartList = this._cartService.cartList;
      const route = this._router.url;

      if (this.cartList.length < 1 && route === '/checkout') {
        this._router.navigateByUrl('/home');
      }
    });

    if (this.cartList.length < 1) {
      this._router.navigateByUrl('/home');
    }
    this._checkUserLogin();
    this._setInit();
  }

  ngOnDestroy(): void {}

  completeMobile(data) {
    if (!data.mobile) return;
    this.checkoutData.mobile = data.mobile;
    this.mobile = data.mobile;
    this.stepper.next();
  }

  completeAddress(address) {
    this.checkoutData.address = address;

    if (address.db)
      this.checkoutData.addressId = address.id ? address.id : null;
    else this.checkoutData.address.id = null;

    this.stepper.next();
    setTimeout(() => {
      this.deliverySlot.setTime();
    }, 300);
  }

  completeSchedule(schedule) {
    this.checkoutData.schedule = schedule;
    this._checkoutService.checkoutData = this.checkoutData;
    this.stepper.next();
  }

  private _setInit() {
    this.user = {
      mobile: null,
      pin: null,
    };
  }

  private _checkUserLogin(): void {
    const user = this._userService.user;
    this.isLoggedIn = user ? user.isLoggedIn : false;
    if (this.isLoggedIn && user) {
      this.checkoutData.mobile = user.mobile;
    }

    this._userService.$loginTracker.pipe(Util.takeUntil(this)).subscribe(() => {
      const user = this._userService.user;
      this.isLoggedIn = user ? user.isLoggedIn : false;
      if (this.isLoggedIn && user) {
        this.checkoutData.mobile = user.mobile;
      }
    });
  }
}
