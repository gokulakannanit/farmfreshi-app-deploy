import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import { AnimationBuilder } from '@angular/animations';

let component: CarouselComponent;
let fixture: ComponentFixture<CarouselComponent>;

let mockAuthService: Partial<AnimationBuilder> = {};

describe('OtpInputComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent],
      providers: [{ provide: AnimationBuilder, useValue: mockAuthService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
