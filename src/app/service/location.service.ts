import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Observable, Subject } from 'rxjs';
import { ICity } from './city.service';
import { IAddress } from './address.service';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _autocompleteService: any;
  private selectedAddress: IAddress;
  public initialLocation;
  public selectedLocation;
  public addressSelected: Subject<any> = new Subject();

  constructor(private http: HttpClient, private mapsAPILoader: MapsAPILoader) {
    this.mapsAPILoader.load().then(() => {
      this._autocompleteService = new google.maps.places.AutocompleteService();
    });
  }

  set(newAddress: IAddress): void {
    this.selectedAddress = newAddress;
    this.addressSelected.next('address changed');
  }

  get(): IAddress {
    return this.selectedAddress;
  }

  getAddress(latitude, longitude) {
    let Observer: Subject<any> = new Subject();
    new google.maps.Geocoder().geocode(
      { location: { lat: latitude, lng: longitude } },
      (results) => {
        if (results[0]) {
          Observer.next(results[0]);
        }
        return false;
      }
    );
    return Observer;
  }

  loadFromAddressBook(addressBook: IAddress[]) {
    if (!this.get()) {
      this.set(
        addressBook.length === 1
          ? addressBook[0]
          : addressBook.filter((item) => parseInt(item.isPrimary) === 1)[0]
      );
    }
  }

  getMyLocation(): Observable<Object[]> {
    let Observer: Subject<any> = new Subject();

    navigator.geolocation.getCurrentPosition(
      (position: Position) => {
        const { latitude, longitude } = position.coords;
        const _mylocationService = new google.maps.Geocoder();
        const location = { lat: latitude, lng: longitude };
        _mylocationService.geocode(
          {
            location: location,
          },
          (result) => {
            const res = result[0];
            if (!res) {
              Observer.error('no result found');
            }
            const address: any = {
              latandlng: location.lat + ',' + location.lng,
              place_id: res.place_id,
              description: res.formatted_address,
            };
            Observer.next(address);
          }
        );
      },
      null,
      { enableHighAccuracy: true }
    );
    return Observer;
  }

  getPlacePredictions(term: string, city: ICity): Observable<Object[]> {
    var latnLng = city.latandlng.split(',');
    let Observer: Subject<any> = new Subject();
    this._autocompleteService.getPlacePredictions(
      {
        input: term,
        componentRestrictions: { country: 'IN' },
        location: new google.maps.LatLng(latnLng[0], latnLng[1]),
        radius: 2000,
        zoom: 17,
      },
      (data: []) => {
        if (data) {
          Observer.next(data);
        }
      }
    );
    return Observer;
  }

  getGeoInfo(address) {
    let Observer: Subject<any> = new Subject();
    const _mylocationService = new google.maps.Geocoder();
    _mylocationService.geocode({ placeId: address.place_id }, function (
      results,
      status
    ) {
      if (status == 'OK') {
        Observer.next(results[0].geometry.location);
      }
      Observer.next('');
    });
    return Observer;
  }
}
