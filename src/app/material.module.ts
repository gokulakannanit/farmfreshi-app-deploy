import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule,
    MatTreeModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ], // note the imports
  exports: [
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatStepperModule,
    MatDialogModule,
    MatTreeModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
  ], // and the exports
})
export class MaterialModule {}
