import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/service/dialog.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
})
export class MessageDialogComponent implements OnInit {
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public msg: any,
    private _dialog: DialogService
  ) {}

  ngOnInit(): void {}

  onClose(data?: any): void {
    this._dialog.close(data);
  }
}
