import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from './header.component';
import { UsernameMaskPipe } from 'src/app/common/pipe/username-mask.pipe';

let component: HeaderComponent;
let fixture: ComponentFixture<HeaderComponent>;

let mockAuthService: Partial<AuthService> = {};
let mockSnackService: Partial<MatSnackBar> = {};

describe('HeaderComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, UsernameMaskPipe],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatSnackBar, useValue: mockSnackService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
