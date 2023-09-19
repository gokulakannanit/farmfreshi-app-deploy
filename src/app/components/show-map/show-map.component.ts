import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { MatDialog } from '@angular/material/dialog';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.component.html',
  styleUrls: ['./show-map.component.css'],
})
export class ShowMapComponent implements OnInit, OnDestroy {
  selectedCity: any;
  isLoading: boolean = true;
  constructor(
    private _location: LocationService,
    private _dialog: MatDialog,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectedCity = this._location.initialLocation;
  }

  ngOnDestroy(): void {}

  markerDragEnd(event) {
    const { lat, lng } = event.coords;
    this.isLoading = true;
    this._location
      .getAddress(lat, lng)
      .pipe(Util.takeUntil(this))
      .subscribe((address) => {
        this._location.selectedLocation = { ...address, lat: lat, lng: lng };
        this.isLoading = false;
        this._cd.detectChanges();
      });
  }

  storeLocation() {
    this._dialog.closeAll();
  }
}
