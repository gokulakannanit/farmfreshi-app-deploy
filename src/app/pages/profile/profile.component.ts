import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Util } from 'src/app/utils/util';
import { SelfService } from 'src/app/service/self.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SUCCESS_MSG, ERROR_MSG } from 'src/app/config/config';
import { UserService, IUser } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('editDialog')
  editDialog: TemplateRef<any>;
  public profile: IUser;
  public copyProfile: any;
  public isLoading: boolean = false;
  public errorMsg: string;
  public editKey: string;
  public progress: number;
  constructor(
    private _userService: UserService,
    private _dialog: MatDialog,
    private _selfService: SelfService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profile = this._userService.user;
    this.copyProfile = JSON.parse(JSON.stringify(this.profile));
  }

  ngOnDestroy(): void {}

  getValue(value, replace) {
    return value !== '' ? value : replace;
  }

  onEdit(key): void {
    this.editKey = key;
    var ele = this._dialog
      .open(this.editDialog, {
        width: '380px',
        height: 'auto',
        autoFocus: false,
      })
      .afterClosed()
      .pipe(Util.takeUntil(this))
      .subscribe(() => {});

    setTimeout(() => {
      document
        .querySelector('.editDialog')
        .querySelectorAll('input')[0]
        .focus();
    }, 100);
  }

  submit(): void {
    this.isLoading = false;
    this.errorMsg = null;
    this._selfService
      .update(this.copyProfile)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data: any) => {
          this.isLoading = false;
          this._snackBar.open(SUCCESS_MSG.PROFILE_UPDATE, null, {
            duration: 2000,
          });
          this._dialog.closeAll();
          this.profile = data;
          this._userService.setUser(this.profile);
        },
        () => {
          this.isLoading = false;
          this.errorMsg = ERROR_MSG.COMMON;
        }
      );
  }
}
