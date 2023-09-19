import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SidebarComponent } from './sidebar.component';

let component: SidebarComponent;
let fixture: ComponentFixture<SidebarComponent>;

describe('SidebarComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
