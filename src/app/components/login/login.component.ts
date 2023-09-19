import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { IUser, UserService } from 'src/app/service/user.service';
import { Util } from 'src/app/utils/util';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SUCCESS_MSG, ERROR_MSG } from 'src/app/config/config';
import { OtpInputComponent } from 'src/app/common/otp-input/otp-input.component';
import { NgForm } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { AddressService } from 'src/app/service/address.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .mat-stepper-horizontal {
        height: calc(100vh - var(--header-height));
      }

      .z-10 {
        z-index: 1;
        position: absolute;
        width: calc(100% - 40px);
      }

      ::ng-deep .mat-horizontal-stepper-header-container {
        visibility: hidden;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('newPinForm') newPinForm: NgForm;
  @ViewChild('verifyForm') verifyForm: NgForm;

  @Output() closeme = new EventEmitter();

  @ViewChild('pinTxt') pinTxt: OtpInputComponent;
  @ViewChild('newPinTxt') newPinTxt: OtpInputComponent;

  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @ViewChild('loginTxt') loginTxt: ElementRef;

  public user: IUser;
  public userExist: boolean = false;
  public step: number = 1;

  public errorMessage: string;
  public isLoading: boolean;

  constructor(
    private _eleRef: ElementRef,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._setInit();
  }

  ngOnDestroy(): void {}

  setInitialFocus() {
    setTimeout(() => Util.focusFirstInput(this._eleRef), 500);
  }

  onPinChange(newPin) {
    if (isNaN(newPin)) {
      return false;
    }
    this.user.pin = newPin;
  }

  onNewPinChange(newPin) {
    if (isNaN(newPin)) return false;
    this.user.newPin = newPin;
  }

  checkUser() {
    this.isLoading = true;
    this.errorMessage = null;
    this._userService
      .isExist(this.user)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          this.isLoading = false;
          if (data) {
            this.userExist = true;
          }
          this.step = 2;
          this._updateStep();
        },
        () => {
          this._error('User check failed');
        }
      );
  }

  verifyUser(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this._userService
      .verify(this.user)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data: IUser) => {
          this.isLoading = false;
          this._userService.setUser(data);
          if (+data.isFirst === 0) {
            this._setInit();
            this.closeme.emit('');
            this.stepper.selectedIndex = 0;
            return;
          }
          this.step = 3;
          this._updateStep();
        },
        () => {
          this._error('Verification Failed, Please Try Correct PIN');
        }
      );
  }

  forgotPassword(): void {
    this._userService
      .forgotPassword(this.user)
      .pipe(Util.takeUntil(this))
      .subscribe(
        () => {
          this._handlePasswordResult();
        },
        () => {
          this._handlePasswordResult(true);
        }
      );
  }

  setNewPin(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this._userService
      .update({ id: this._userService.user.id, pin: this.user.newPin })
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          this.isLoading = false;
          this._snackBar.open(SUCCESS_MSG.NEW_PIN, null, {
            duration: 2000,
          });
          this.closeme.emit('');
          this._setInit();
          this.stepper.selectedIndex = 0;
        },
        () => {
          this.isLoading = false;
          this.errorMessage = 'New Pin not updated, please try again.';
        }
      );
  }

  private _handlePasswordResult(error: boolean = false) {
    this.isLoading = false;
    this._snackBar.open(
      error ? ERROR_MSG.PASSWORD_SENT : SUCCESS_MSG.PASSWORD_SENT,
      null,
      {
        duration: 2000,
      }
    );
  }

  private _error(msg: string): void {
    this.isLoading = false;
    this.errorMessage = msg;
  }

  private _updateStep() {
    this.stepper.next();
    if (this.step === 2) this.pinTxt.focus();
    if (this.step === 3) this.newPinTxt.focus();
  }

  private _setInit(): void {
    this.user = {
      mobile: null,
      pin: null,
      newPin: null,
    };
  }
}
