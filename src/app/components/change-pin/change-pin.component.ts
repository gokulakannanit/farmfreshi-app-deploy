import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { IUser, UserService } from 'src/app/service/user.service';
import { Util } from 'src/app/utils/util';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-change-pin',
  templateUrl: './change-pin.component.html',
  styleUrls: ['./change-pin.component.css'],
})
export class ChangePinComponent implements OnInit, OnDestroy {
  public errorMessage: string;
  public user: IUser;
  public isLoading: boolean = false;
  constructor(
    private _eleRef: ElementRef,
    private _dialog: DialogService,
    private _user: UserService
  ) {}

  ngOnInit(): void {
    this._setInit();

    Util.focusFirstInput(this._eleRef);
  }

  ngOnDestroy(): void {}

  onPinChange(data) {
    if (isNaN(data)) {
      return false;
    }
    this.user.pin = data;
  }

  onNewPinChange(data) {
    if (isNaN(data)) {
      return false;
    }
    this.user.newPin = data;
  }

  changePin(): void {
    this.isLoading = true;
    this._user
      .changePin(this.user)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          this.isLoading = false;
          this._dialog.closeAll();
          return 0;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  private _setInit() {
    this.user = {
      mobile: null,
      pin: null,
    };
  }
}
