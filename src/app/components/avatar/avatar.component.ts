import { Component, OnInit, Input } from '@angular/core';
import { SelfService } from 'src/app/service/self.service';
import { Util } from 'src/app/utils/util';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'profile-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
})
export class AvatarComponent implements OnInit {
  @Input() id: number;
  @Input() avatar: string;
  @Input() size: string = 'small';
  @Input() gender: string = 'male';
  @Input() bg: string = 'white';
  @Input() noUpload: boolean = false;
  progress: number;
  constructor(
    private _selfService: SelfService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  selectThumb(event) {
    if (event.target.files.length > 0) {
      var formData: any = new FormData();
      formData.append('id', this.id);
      formData.append('avatar', event.target.files.item(0));
      this._selfService
        .updateImage(formData)
        .pipe(Util.takeUntil(this))
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.progress = Math.round((event.loaded / event.total) * 100);
              break;
            case HttpEventType.Response:
              this.avatar = null;
              let profile = this._userService.user;
              this.avatar = event.body.detail.avatar + '?' + new Date();
              if (+profile.id === +this.id) {
                profile.avatar = this.avatar;
                this._userService.setUser(profile);
              }
              this.progress = 100;
              setTimeout(() => {
                this.progress = 0;
              }, 100);
          }
        });
    }
  }
}
