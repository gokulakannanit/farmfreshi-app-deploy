import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { Util } from 'src/app/utils/util';
import { UserService, IUser } from 'src/app/service/user.service';
import { IAddress, AddressService } from 'src/app/service/address.service';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
})
export class AddressBookComponent implements OnInit, OnDestroy {
  @Output() complete = new EventEmitter();

  public addressBook: IAddress[] = [];
  public isLoading: boolean = false;
  public user: IUser;

  constructor(
    private _location: LocationService,
    private _userService: UserService,
    private _addressService: AddressService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this._userService.user;

    this._setAddress();

    this._location.addressSelected
      .pipe(Util.takeUntil(this))
      .subscribe(() => this._setAddress());

    this._getAddress();
  }

  ngOnDestroy(): void {}

  selectAddress(address: IAddress): void {
    this._location.set(address);
  }

  private _setAddress(): void {
    const address = this._location.get();
    if (address && address.id) {
      this.addressBook.map(
        (item) => (item.isSelected = item.id === address.id)
      );
    }
  }

  updatePrimary(address: IAddress): void {
    if (address.oldRecord.isPrimary === address.isPrimary) return;
    address.isLoading = true;
    this._addressService
      .update({
        id: address.id,
        mobile: address.mobile,
        isPrimary: address.isPrimary ? 1 : 0,
      })
      .pipe(Util.takeUntil(this))
      .subscribe(
        () => {
          address.isLoading = false;
          this._getAddress();
        },
        (error) => {
          address.isLoading = false;
        }
      );
  }

  onDelete(address: IAddress): void {
    address.isLoading = true;
    this._addressService
      .delete(address.id)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          address.isLoading = false;
          if (address.isSelected) {
            this._location.set(null);
          }
          this._getAddress();
        },
        (error) => {
          address.isLoading = false;
        }
      );
  }

  onEdit(id: number) {}

  private _getAddress(): void {
    this._addressService
      .getByMobile(this.user.mobile)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.addressBook = [];
          if (data && data.length > 0) {
            this.addressBook = data;
            this.addressBook.map((item) => {
              item.isPrimary = item.isPrimary === '1';
              item.oldRecord = Object.assign({}, item);
              item.db = true;
            });
            this._setAddress();
            this._location.loadFromAddressBook(this.addressBook);
          }
        },
        (error) => {
          this.isLoading = false;
          this.addressBook = [];
        }
      );
  }
}
