import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductsComponent } from './search-products.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SearchProductsComponent', () => {
  let component: SearchProductsComponent;
  let fixture: ComponentFixture<SearchProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProductsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
