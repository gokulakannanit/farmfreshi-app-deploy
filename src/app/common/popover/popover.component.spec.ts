import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import { PopoverComponent } from './popover.component';
import { Overlay } from '@angular/cdk/overlay';

let component: PopoverComponent;
let fixture: ComponentFixture<PopoverComponent>;

let mockOverlayService: Partial<Overlay> = {};
let mockViewContainerRef: Partial<ViewContainerRef> = {};

describe('PopoverComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopoverComponent],
      providers: [
        { provide: Overlay, useValue: mockOverlayService },
        { provide: ViewContainerRef, useValue: mockViewContainerRef },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
