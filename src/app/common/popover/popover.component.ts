import {
  Component,
  ViewContainerRef,
  TemplateRef,
  ViewChild,
  OnDestroy,
  Input,
  HostListener,
} from '@angular/core';
import {
  Overlay,
  OverlayRef,
  ConnectionPositionPair,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, Observable } from 'rxjs';
import { Util } from 'src/app/utils/util';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
})
export class PopoverComponent implements OnDestroy {
  @ViewChild(TemplateRef) content: TemplateRef<any>;
  @Input() title: string;
  @Input() noArrow: boolean = false;

  private _portal: TemplatePortal<any>;
  private _overlayRef: OverlayRef;

  private ESCAPE_KEYCODE = 27;

  public afterClosed$: Subject<any> = new Subject<any>();

  constructor(
    private _overlay: Overlay,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnDestroy(): void {}

  open(element: any): Observable<any> {
    if (!this._overlayRef) {
      const positionStrategy = this._overlay
        .position()
        .flexibleConnectedTo(element)
        .withPush(false)
        .withFlexibleDimensions(false)
        .withPositions(this._getPosition());

      this._overlayRef = this._overlay.create({
        hasBackdrop: true,
        positionStrategy,
      });

      this._overlayRef
        .backdropClick()
        .pipe(Util.takeUntil(this))
        .subscribe(this.close.bind(this));

      if (!this._portal)
        this._portal = new TemplatePortal(this.content, this._viewContainerRef);

      this._overlayRef.attach(this._portal);
    }
    return this.afterClosed$;
  }

  @HostListener('document:keyup.escape') close(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
      this.afterClosed$.next();
    }
  }

  private _getPosition(): ConnectionPositionPair[] {
    return [
      // top center
      {
        overlayX: 'center',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'center'],
      },
      // top left
      {
        overlayX: 'start',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'left'],
      },
      // top right
      {
        overlayX: 'end',
        overlayY: 'bottom',
        originX: 'center',
        originY: 'top',
        panelClass: ['bottom', 'right'],
      },
      // bottom center
      {
        overlayX: 'center',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'center'],
      },
      // bottom left
      {
        overlayX: 'start',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'left'],
      },
      // bottom right
      {
        overlayX: 'end',
        overlayY: 'top',
        originX: 'center',
        originY: 'bottom',
        panelClass: ['top', 'right'],
      },
    ];
  }
}
