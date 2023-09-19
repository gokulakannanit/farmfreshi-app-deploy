import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit {
  public videoUrl: SafeResourceUrl;
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public videoDetail: any,
    public sanitizer: DomSanitizer
  ) {
    if (videoDetail.video) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        videoDetail.video
      );
    }
  }

  ngOnInit(): void {}
}
