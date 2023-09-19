import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService } from 'src/app/service/dialog.service';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { CommonService } from 'src/app/service/common.service';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  public recepies: any[];
  constructor(private _dialog: DialogService, private _common: CommonService) {}

  ngOnInit(): void {
    const cityData = this._common.cityData;
    if (cityData) this._fillVideoData(cityData);

    this._common.$afterCityCtrlLoaded
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) return false;
        this._fillVideoData(data);
      });
  }

  ngOnDestroy(): void {}

  openVideo(receipe): void {
    this._dialog.openCustomDialog(VideoPlayerComponent, {
      video: receipe.video,
    });
  }

  private _fillVideoData(data): void {
    this.recepies = data.videoList;
  }
}
