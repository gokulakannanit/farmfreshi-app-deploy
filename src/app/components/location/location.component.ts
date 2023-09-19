import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { Util } from 'src/app/utils/util';
import { Subject } from 'rxjs';
import { ICity } from 'src/app/service/city.service';
import { DialogService } from 'src/app/service/dialog.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'location-selector',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit, OnDestroy {
  @ViewChild('citySelection', { read: ElementRef })
  citySelection: ElementRef;

  private destroyLocationSearch$: Subject<any> = new Subject();
  public isLoading: boolean = false;
  public locations: any[] = [];
  public city: ICity;
  public selectedLocation: any;
  public searchTxt: string;
  public isLoggedIn: boolean = false;

  constructor(
    private _cd: ChangeDetectorRef,
    private _userService: UserService,
    private _location: LocationService,
    private _dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this._detectUserLogin();
    this.locations = [];
    this.searchTxt = '';
    setTimeout(() => {
      this.citySelection.nativeElement.focus();
    }, 100);
  }

  ngOnDestroy(): void {}

  onCitySelection(selCity: ICity) {
    this.city = selCity;
  }

  openMap() {
    if (!this.city) return false;
    this._setCityLocation();
    this._dialogService
      .openMapPopup()
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        console.log(
          'this._location.selectedLocation',
          this._location.selectedLocation
        );
        const { lat, lng } = this._location.selectedLocation;
        this._location.selectedLocation.latandlng = lat + ',' + lng;
        this.selectItem(this._location.selectedLocation);
      });
  }

  private _setCityLocation() {
    const { latandlng } = this.city;
    const cityBoundary = {
      lat: +latandlng.split(',')[0],
      lng: +latandlng.split(',')[1],
      zoom: 15,
    };
    this._location.initialLocation = cityBoundary;
  }

  onSearch(event: KeyboardEvent): void {
    const searchValue: string = (event.target as HTMLInputElement).value;
    if (searchValue.length < 3) {
      this.locations = [];
      return;
    }
    this.isLoading = true;
    this._location
      .getPlacePredictions(searchValue, this.city)
      .pipe(Util.takeUntil(this, this.destroyLocationSearch$))
      .subscribe((arg: any[]) => {
        this.locations = arg;
        this.destroyLocationSearch$.next();
      });
  }

  selectItem(value): void {
    if (value.latandlng) {
      if (!value.description) {
        value.description = value.formatted_address;
      }
      this._location.set(value);
      this.isLoading = false;
      this._cd.detectChanges();
    } else {
      this._location
        .getGeoInfo(value)
        .pipe(Util.takeUntil(this))
        .subscribe((data) => {
          if (!data) return false;
          this.isLoading = false;
          const { place_id, description } = value;
          const latandlng = data.lat() + ',' + data.lng();
          this.locations = [];
          this._location.set({
            ...this._location.get(),
            latandlng: latandlng,
            place_id: place_id,
            description: description,
          });
        });
    }
  }

  openAddressbook() {
    this._location.addressSelected.next('address changed');
    this._dialogService.openAddressbook();
  }

  // Get Current Location Coordinates
  setCurrentLocation() {
    this.isLoading = true;
    this._location
      .getMyLocation()
      .pipe(Util.takeUntil(this))
      .subscribe((address: any) => {
        this.selectItem(address);
      });
  }

  private _detectUserLogin() {
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
  }
}
