import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  public footerLinks: any[];
  constructor(private _common: CommonService) {}

  ngOnInit(): void {
    this._common.$afterCityCtrlLoaded
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) return false;
        this.footerLinks = data.footerLinks;
      });
  }

  ngOnDestroy(): void {}
}
