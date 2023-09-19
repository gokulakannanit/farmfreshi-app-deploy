import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { IAddress } from 'src/app/service/address.service';
import { LocationService } from 'src/app/service/location.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-address-flow',
  templateUrl: './address-flow.component.html',
  styleUrls: ['./address-flow.component.css'],
})
export class AddressFlowComponent implements OnInit, OnDestroy {
  @Output('complete') complete: EventEmitter<IAddress> = new EventEmitter();
  public selectedLocation: IAddress;
  public showAddress: boolean = false;
  public oldData: boolean;
  public landmark: string;
  public title: string;
  constructor(
    private _cd: ChangeDetectorRef,
    private _eleRef: ElementRef,
    private _location: LocationService
  ) {}

  ngOnInit(): void {
    this._setAddress();
    this._location.addressSelected
      .pipe(Util.takeUntil(this))
      .subscribe(() => this._setAddress());
  }

  ngOnDestroy(): void {}

  ngAfterViewChecked(): void {
    if (this.showAddress !== this.oldData && this.showAddress === true) {
      Util.focusFirstInput(this._eleRef);
    }
    this.oldData = this.showAddress;
  }

  onAddressChange(): void {
    this.selectedLocation = Object.assign({}, null);
    this.showAddress = false;
  }

  continue(): void {
    this.selectedLocation.title = this.title;
    this.selectedLocation.landmark = this.landmark;
    this.complete.emit(this.selectedLocation);
  }

  onBack(): void {
    this._setAddress();
  }

  private _setAddress(): void {
    console.log('here');
    this.selectedLocation = Object.assign({}, this._location.get());
    this.showAddress = false;
    if (this.selectedLocation && this.selectedLocation.latandlng) {
      this.showAddress = true;
    }

    this._cd.detectChanges();
  }
}
