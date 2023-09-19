import {
  Component,
  AfterViewInit,
  QueryList,
  ContentChildren,
  ViewChildren,
  ViewChild,
  Input,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  AnimationPlayer,
  AnimationFactory,
  style,
  animate,
  AnimationBuilder,
} from '@angular/animations';
import { fromEvent } from 'rxjs';
import { Util } from 'src/app/utils/util';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent implements AfterViewInit, OnDestroy {
  @ContentChildren('cItem')
  public items: QueryList<any>;
  @ViewChildren('carouseItem', { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  @ViewChild('carousel')
  private carousel: ElementRef;
  @ViewChild('carouselWrapper')
  private carouselWrapper: ElementRef;

  @Input() public timing: string = '300ms ease';
  @Input() public showControls: boolean = true;
  @Input() public fullWidth: boolean = true;
  @Input() public navigationInside: boolean = false;

  public carouselWrapperStyle = {};

  public showSlide: boolean = false;

  private player: AnimationPlayer;
  private itemWidth: number;
  private currentSlide = 0;
  public showPrev: boolean = true;
  public showNext: boolean = true;

  public layoutAlign: string = 'start start';

  constructor(private builder: AnimationBuilder) {}

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {
    fromEvent(window, 'resize')
      .pipe(Util.takeUntil(this), debounceTime(500))
      .subscribe(() => this._reset());
    setTimeout(() => this._reset(), 300);
  }

  next() {
    if (this.currentSlide + 1 === this.items.length) return;
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    this.setAnimation();
  }

  prev() {
    if (this.currentSlide === 0) return;
    this.currentSlide =
      (this.currentSlide - 1 + this.items.length) % this.items.length;
    this.setAnimation();
  }

  private setAnimation(): void {
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation: AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    try {
      this.player.play();
    } catch {}

    this.enableControls(offset);
  }

  private _reset(): void {
    this.showSlide = true;
    if (!this.itemsElements.first) {
      setTimeout(() => {
        this.showSlide = false;
        this._reset();
      }, 300);
      return;
    }
    this.itemWidth = Util.getRect(this.itemsElements.first).width;

    if (!this.fullWidth) {
      this.carouselWrapperStyle = {
        width: `${this.itemWidth}px`,
      };
    }

    this.currentSlide = 1;
    this.prev();
  }

  private enableControls(offset): void {
    const totalItems = this.items.length;
    const listWidth = this.itemWidth * totalItems;
    const sectionWidth = Util.getRect(this.carouselWrapper).width;
    this.showPrev = this.showNext = true;

    if (offset <= 0) this.showPrev = false;
    if (offset >= listWidth - sectionWidth) this.showNext = false;
    if (listWidth < sectionWidth) {
      this.showPrev = this.showNext = false;
      this.layoutAlign = 'center start';
    }
  }

  private buildAnimation(offset): AnimationFactory {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` })),
    ]);
  }
}
