import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationComponent } from './location.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';

let component: LocationComponent;
let fixture: ComponentFixture<LocationComponent>;

let mockLocationService: Partial<LocationService> = {};

describe('LocationComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent],
      providers: [{ provide: LocationService, useValue: mockLocationService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
