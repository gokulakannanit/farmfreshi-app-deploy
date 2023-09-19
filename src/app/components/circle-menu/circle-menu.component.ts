import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.css'],
})
export class CircleMenuComponent implements OnInit, OnDestroy {
  public openChannel: boolean = false;
  public channels;
  constructor(private _common: CommonService) {}

  ngOnInit(): void {
    this._common.$afterCityCtrlLoaded
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        this.channels = data.communication;
      });
  }

  ngOnDestroy(): void {}

  toggleMe(): void {
    this.openChannel = !this.openChannel;
  }
}
