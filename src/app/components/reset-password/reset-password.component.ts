import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SUCCESS_MSG, ERROR_MSG } from 'src/app/config/config';
import { AuthService } from 'src/app/service/auth.service';
import { Util } from 'src/app/utils/util';
import { FormControl, FormGroup } from '@angular/forms';
import { userForm } from 'src/app/form/user-form';
import { IUser } from 'src/app/model/user';
import { OtpInputComponent } from 'src/app/common/otp-input/otp-input.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent
  implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pinTxt') pinTxt: OtpInputComponent;
  @ViewChild('newPinTxt') newPinTxt: OtpInputComponent;
  public user: IUser = userForm.User;
  public isLoading: boolean = false;
  public otpVerified: boolean = false;
  public pinGenerated: boolean = false;
  public isForgotPassword: boolean = true;
  public setPinForm: FormGroup;
  public verifyForm: FormGroup;
  public errorMsg: string;
  public mobile: number;
  constructor(
    private _router: Router,
    private eleRef: ElementRef,
    private _snackBar: MatSnackBar,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isForgotPassword = window.location.pathname === '/password/forgot';

    if (!this.isForgotPassword) {
      this.mobile = this._authService.getUser().mobile;
      this.pinGenerated = this.otpVerified = true;
    }

    this.verifyForm = new FormGroup({
      pin: userForm.getFormCtrl(this.user, 'pin'),
    });

    this.setPinForm = new FormGroup({
      newPin: userForm.getFormCtrl(this.user, 'pin'),
      confirmPin: userForm.getFormCtrl(this.user, 'confirmPin'),
    });

    this.setPinForm.valueChanges.pipe(Util.takeUntil(this)).subscribe((x) => {
      if (
        x.newPin !== x.confirmPin &&
        (x.newPin !== '' || x.confirmPin !== '')
      ) {
        this.confirmPin.setErrors({ 'Otp Not matching': true });
      }
    });
  }

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    const inputEle = Util.getInput(this.eleRef);
    setTimeout(() => inputEle[0].focus(), 100);
  }

  checkAndSendOtp(): void {
    this.isLoading = true;
    this.errorMsg = null;
    this._authService
      .generateOtp(this.mobile)
      .pipe(Util.takeUntil(this))
      .subscribe(
        () => {
          this.isLoading = false;
          this.pinGenerated = true;
          setTimeout(() => this.pinTxt.firstInput.nativeElement.focus(), 100);
        },
        () => {
          this.isLoading = false;
          this.errorMsg = 'Verify mobile no and enter valid one';
        }
      );
  }

  verifyOtp(): void {
    this.isLoading = true;
    this.errorMsg = null;
    this._authService
      .verifyOtp(this.mobile, this.pin.value)
      .pipe(Util.takeUntil(this))
      .subscribe(
        () => {
          this.isLoading = false;
          this.otpVerified = true;
          setTimeout(
            () => this.newPinTxt.firstInput.nativeElement.focus(),
            100
          );
        },
        () => {
          this.isLoading = false;
          this.errorMsg = 'OTP verification failed.';
        }
      );
  }

  setNewPin(): void {
    this.isLoading = true;
    this.errorMsg = null;
    this._authService
      .setNewPin(this.mobile, this.newPin.value)
      .pipe(Util.takeUntil(this))
      .subscribe(
        () => {
          this.isLoading = false;
          this._snackBar.open(SUCCESS_MSG.NEW_PIN, null, {
            duration: 2000,
          });
          if (this.isForgotPassword) {
            this._router.navigateByUrl('/login');
          } else {
            this._router.navigateByUrl('/home');
          }
        },
        () => {
          this.isLoading = false;
          this.errorMsg = ERROR_MSG.COMMON;
        }
      );
  }
  get pin(): FormControl {
    return this.verifyForm.get('pin') as FormControl;
  }
  get newPin(): FormControl {
    return this.setPinForm.get('newPin') as FormControl;
  }
  get confirmPin(): FormControl {
    return this.setPinForm.get('confirmPin') as FormControl;
  }
}
