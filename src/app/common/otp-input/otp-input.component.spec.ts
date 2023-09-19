import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OtpInputComponent } from './otp-input.component';

let component: OtpInputComponent;
let fixture: ComponentFixture<OtpInputComponent>;

describe('OtpInputComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpInputComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpInputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
