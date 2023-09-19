import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFlowComponent } from './address-flow.component';

describe('AddressFlowComponent', () => {
  let component: AddressFlowComponent;
  let fixture: ComponentFixture<AddressFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
