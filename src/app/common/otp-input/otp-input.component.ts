import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'otp-input',
  template: `<mat-form-field class="otp-wrapper">
    <mat-label>{{ placeholder }}</mat-label>
    <mat-form-field>
      <input
        type="text"
        matInput
        (keyup)="valueChanged($event)"
        (blur)="updateValue()"
        maxlength="1"
        required
        [(ngModel)]="inputValue[0]"
        #firstInput
      />
    </mat-form-field>
    <mat-form-field>
      <input
        type="text"
        matInput
        (keyup)="valueChanged($event)"
        (blur)="updateValue()"
        required
        maxlength="1"
        [(ngModel)]="inputValue[1]"
      />
    </mat-form-field>
    <mat-form-field>
      <input
        type="text"
        matInput
        (keyup)="valueChanged($event)"
        (blur)="updateValue()"
        maxlength="1"
        required
        [(ngModel)]="inputValue[2]"
      />
    </mat-form-field>
    <mat-form-field>
      <input
        type="text"
        matInput
        (keyup)="valueChanged($event)"
        (blur)="updateValue()"
        maxlength="1"
        required
        [(ngModel)]="inputValue[3]"
      /> </mat-form-field
  ></mat-form-field> `,
  styles: [
    `
      :host {
        display: block;
        text-align: left;
      }
      :host ::ng-deep .mat-form-field-label-wrapper {
        text-align: left;
      }
      mat-form-field {
        width: calc(25% - 10px);
        margin: 0 10px 0 0;
        text-align: center;
      }
      mat-form-field:last-child {
        width: 25%;
        margin: 0;
      }
      mat-form-field.otp-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
      }
      mat-form-field.otp-wrapper ::ng-deep > .mat-form-field-wrapper {
        padding: 0px;
      }
      mat-form-field.otp-wrapper
        > .mat-form-field-wrapper
        .mat-form-field-flex {
        padding: 0;
      }

      mat-form-field.otp-wrapper
        > .mat-form-field-appearance-legacy
        .mat-form-field-wrapper {
        padding: 0;
        margin: 0;
      }

      ::ng-deep
        mat-form-field.otp-wrapper
        > .mat-form-field-wrapper
        > .mat-form-field-underline {
        display: none;
      }

      mat-form-field.otp-wrapper
        ::ng-deep
        > .mat-form-field-wrapper
        > .mat-form-field-flex
        > .mat-form-field-infix {
        padding: 0px;
        border: 0px;
      }

      mat-form-field.otp-wrapper
        ::ng-deep
        > .mat-form-field-wrapper
        > .mat-form-field-flex
        > .mat-form-field-infix
        .mat-form-field-label-wrapper {
        top: 5px;
      }

      mat-form-field.otp-wrapper
        ::ng-deep
        > .mat-form-field-wrapper
        > .mat-form-field-flex
        > .mat-form-field-infix
        .mat-form-field-label-wrapper
        .mat-form-field-label {
        padding-top: 0;
      }
    `,
  ],
})
export class OtpInputComponent implements OnInit {
  @ViewChild('firstInput') firstInput: ElementRef;

  @Input()
  value: any;

  @Output() change = new EventEmitter();

  @Input()
  placeholder: string = 'Enter 4 digit pin';

  public inputValue: number[] = new Array(4);

  constructor() {}

  ngOnInit(): void {}

  focus() {
    setTimeout(() => this.firstInput.nativeElement.focus(), 500);
  }

  valueChanged(evt: KeyboardEvent): void {
    const ele = (evt.srcElement as HTMLElement).parentNode.parentNode.parentNode
      .parentNode;
    if (!isNaN(parseInt(evt.key))) {
      this._setFocus(ele, 'nextSibling');
    } else if (evt.key === 'Backspace') {
      this._setFocus(ele, 'previousSibling');
    }
    this.updateValue();
    this.change.emit(this.inputValue.join(''));
  }

  public updateValue(): void {
    this.value = this.inputValue.join('');
  }

  private _setFocus(formEle, iteration): void {
    const nextElement: HTMLInputElement = (formEle[iteration] as HTMLElement)
      ? (formEle[iteration] as HTMLElement).getElementsByTagName('input')[0]
      : null;

    nextElement ? nextElement.focus() : '';
  }
}
