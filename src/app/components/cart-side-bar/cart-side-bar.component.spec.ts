import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CartSideBarComponent } from './cart-side-bar.component';
import { CartService } from 'src/app/service/cart.service';

let component: CartSideBarComponent;
let fixture: ComponentFixture<CartSideBarComponent>;

let mockCartService: Partial<CartService> = {};

describe('CartSideBarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartSideBarComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CartSideBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
