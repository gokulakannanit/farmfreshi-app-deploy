import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

let mockAuthService: Partial<AuthService> = {};
let mockDialogService: Partial<MatDialog> = {};
let mockSnackService: Partial<MatSnackBar> = {};

describe('LoginComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: MatDialog, useValue: mockDialogService },
        { provide: MatSnackBar, useValue: mockSnackService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should creare component', () => {
    expect(component).toBeDefined();
  });
});
