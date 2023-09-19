import { Component, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() public position: string = 'start';
  @ViewChild('ctrl')
  private ctrl: MatSidenav;

  constructor() {}

  open(): Promise<any> {
    return this.ctrl.open();
  }
  toggle(): Promise<any> {
    return this.ctrl.toggle();
  }
  close(): Promise<any> {
    return this.ctrl.close();
  }
}
