import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  EventEmitter,
  ViewChild,
  Output,
} from '@angular/core';
import { IUser, UserService } from 'src/app/service/user.service';
import { Util } from 'src/app/utils/util';
import { MatHorizontalStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-verify-mobile',
  templateUrl: './verify-mobile.component.html',
  styleUrls: ['./verify-mobile.component.css'],
})
export class VerifyMobileComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @Output('complete') complete: EventEmitter<IUser> = new EventEmitter();

  public user: IUser;
  public isLoading: boolean = false;
  public errorMessage: string;
  constructor(private _eleRef: ElementRef, private _userService: UserService) {}

  ngOnInit(): void {
    this._setInit();
    setTimeout(() => Util.focusFirstInput(this._eleRef), 500);
  }

  ngOnDestroy(): void {}

  onPinChange(newPin) {
    if (isNaN(newPin)) {
      return false;
    }
    this.user.pin = newPin;
  }

  sendOtp(): void {
    this.isLoading = true;
    this._userService
      .sendOtp(this.user)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          this.isLoading = false;
          if (data) {
            this._goNext();
          }
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        }
      );
  }

  verify(): void {
    this.isLoading = true;
    this._userService
      .verifyOtp(this.user)
      .pipe(Util.takeUntil(this))
      .subscribe((data: IUser) => {
        this.isLoading = false;
        if (data) {
          this._complete();
        }
      });
  }

  private _complete() {
    this.complete.emit(this.user);
  }

  private _goNext(): void {
    this.stepper.next();
    if (this.stepper.selectedIndex === 1)
      setTimeout(() => Util.getInput(this._eleRef)[1].focus(), 100);
  }

  private _setInit(): void {
    this.user = {
      mobile: null,
      pin: null,
    };
  }
}
