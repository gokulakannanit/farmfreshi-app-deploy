import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-schedule-delivery',
  templateUrl: './schedule-delivery.component.html',
  styleUrls: ['./schedule-delivery.component.css'],
})
export class ScheduleDeliveryComponent implements OnInit, OnDestroy {
  @Output('complete') complete: EventEmitter<any> = new EventEmitter();
  public hour: number;
  public schedule: string;
  public errorMsg: string;
  public step: number = 0;
  constructor() {}

  ngOnInit(): void {
    this._checkCurrentTime();
  }

  ngOnDestroy(): void {}

  continue() {
    if (!this.verifyScheduleSlot()) return;
    this.complete.emit(this.schedule);
  }
  verifyScheduleSlot() {
    const date = new Date();
    this.hour = date.getHours();
    let scheduleValid = true;
    if (this.hour >= 6 && this.schedule === '01') {
      scheduleValid = false;
    } else if (this.hour >= 8 && this.schedule === '02') {
      scheduleValid = false;
    } else if (this.hour >= 10 && this.schedule === '03') {
      scheduleValid = false;
    } else if (this.hour >= 12 && this.schedule === '04') {
      scheduleValid = false;
    }
    if (!scheduleValid) {
      this.schedule = null;
      this.errorMsg =
        "Sorry, Schedule selected can't be delivered at this moment.";
    }
    return scheduleValid;
  }

  setTime(): void {
    this._checkCurrentTime();
  }

  private _checkCurrentTime(): void {
    const date = new Date();
    this.hour = date.getHours();
    this.schedule = '01';
    if (this.hour > 6 && this.hour < 8) {
      this.schedule = '02';
    }

    if (this.hour >= 8 && this.hour < 10) {
      this.schedule = '03';
    }

    if (this.hour >= 10 && this.hour < 12) {
      this.schedule = '04';
    }
    this.step = 0;

    if (this.hour >= 12) {
      this.schedule = '11';
      this.step = 1;
    }
  }
}
