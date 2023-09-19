import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { PopoverComponent } from 'src/app/common/popover/popover.component';
import { LocationService } from 'src/app/service/location.service';
import { Util } from 'src/app/utils/util';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/service/user.service';
import { CartService } from 'src/app/service/cart.service';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('loginSideNav') loginSideNav: SidebarComponent;
  @ViewChild('login') login: LoginComponent;
  @ViewChild('accountPopover') accountPopover: PopoverComponent;
  @ViewChild('locationPopover') locationPopover: PopoverComponent;
  @ViewChild('locationBtn') locationBtn: HTMLElement;

  public user: any;
  public badgeCount: Number;
  public badgeUpdated: boolean = false;
  public showCart: boolean = true;
  public selectedLocation: string;

  constructor(
    private _cd: ChangeDetectorRef,
    private _cart: CartService,
    private _location: LocationService,
    private _dialog: DialogService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    this._listeners();
  }

  ngOnDestroy(): void {}

  logout(): void {
    this.accountPopover.close();
    this._userService.logout();
  }

  changePin(): void {
    this._dialog.openChangePin();
    this.closePopover();
  }

  closePopover(): void {
    this.accountPopover.close();
  }

  openLoginWindow(element: any = null) {
    if (this.user && this.user.isLoggedIn) {
      this.accountPopover.open(element.currentTarget);
      return;
    }
    this.loginSideNav.open();
    this.login.setInitialFocus();
  }

  openLocationSelector(event: MouseEvent): void {
    this.locationPopover.open(event.currentTarget as HTMLElement);
  }

  private _listeners(): void {
    this._location.addressSelected.pipe(Util.takeUntil(this)).subscribe(() => {
      this.locationPopover.close();
      const location = this._location.get();
      this.selectedLocation = null;
      if (location) this.selectedLocation = location.description;
      this._cd.detectChanges();
    });

    if (this._userService.user) {
      this.user = this._userService.user;
    }
    this._userService.$loginTracker
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        this.user = null;
        if (data) {
          this.user = data;
        }
      });
    this._listenCart();
  }

  openAddressbook(): void {
    this._dialog.openAddressbook();
    this.closePopover();
  }

  private _listenCart() {
    this._cart.afterAdd$.pipe(Util.takeUntil(this)).subscribe((list) => {
      this.badgeCount = list.length;
      this.badgeUpdated = true;
      setTimeout(() => (this.badgeUpdated = false), 300);
    });
  }
}
