import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-category',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  @Input('sidebar') sidebar: boolean = false;
  @Output() closeme = new EventEmitter();
  public categories: any[];
  constructor(private _common: CommonService, private _router: Router) {}

  ngOnInit(): void {
    const cityData = this._common.cityData;
    if (cityData) this.categories = cityData.categories;

    this._common.$afterCityCtrlLoaded
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) return false;
        this.categories = data.categories;
      });
  }
  ngOnDestroy(): void {}

  openLink(link: string): void {
    this._router.navigateByUrl(link);
    this.closeme.emit('');
  }
}
