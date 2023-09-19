import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CityService, ICity } from 'src/app/service/city.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css'],
})
export class CitySelectorComponent implements OnInit, OnDestroy {
  @Input('selectCity') selectCity: ICity;
  @Output('change') change: EventEmitter<ICity> = new EventEmitter();
  public isLoading = true;
  public cities: ICity[] = [];
  public errorMsg: string;
  constructor(
    private _cd: ChangeDetectorRef,
    private _cityService: CityService
  ) {}

  ngOnInit(): void {
    this._getCities();
  }

  ngOnDestroy(): void {}

  onChange(): void {
    this.change.emit(this.selectCity);
  }

  private _getCities(): void {
    this.isLoading = true;
    this._cityService
      .getCities()
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          if (!data) return;
          this.cities = data;
          if (this.selectCity) {
            this.selectCity = this.cities.filter(
              (item) => item.id === this.selectCity.id
            )[0];
          } else {
            this.selectCity = this.cities[0];
          }
          this.change.emit(this.selectCity);
          this._cd.detectChanges();
        },
        (error) => {
          this.isLoading = false;
          this.errorMsg = 'Error getting city';
        }
      );
  }
}
