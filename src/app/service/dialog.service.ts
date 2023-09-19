import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddressBookComponent } from '../components/address-book/address-book.component';
import { ChangePinComponent } from '../components/change-pin/change-pin.component';
import { ShowMapComponent } from '../components/show-map/show-map.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  public ref: MatDialogRef<any>;
  constructor(public dialog: MatDialog) {}

  openAddressbook() {
    this.ref = this.dialog.open(AddressBookComponent, {
      width: '420px',
      height: '400px',
      autoFocus: false,
    });
    return this.ref.afterClosed();
  }

  openMapPopup() {
    return this.dialog
      .open(ShowMapComponent, {
        width: '100%',
        height: '400px',
        maxWidth: '800px',
        autoFocus: false,
      })
      .afterClosed();
  }

  openChangePin() {
    this.ref = this.dialog.open(ChangePinComponent, {
      width: '420px',
      height: '300px',
      autoFocus: false,
    });
    return this.ref.afterClosed();
  }

  openCustomDialog(component, data?: any, options: any = null) {
    const Width = screen.width > 500 ? '500px' : screen.width - 20 + 'px';
    this.ref = this.dialog.open(component, {
      width: Width,
      maxWidth: Width,
      height: 'auto',
      autoFocus: false,
      data: data,
      panelClass: 'full-screen-modal',
    });
    return this.ref.afterClosed();
  }

  closeAll() {
    this.dialog.closeAll();
  }

  close(data) {
    this.ref.close(data);
  }
}
