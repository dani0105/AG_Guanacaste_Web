import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import {
  ListComponent,
  CreateComponent
} from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ActivityService,
  ActivityTypeService,
  AccessibilityService,
  DifficultyService,
} from './services';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    SharedModule,
    CKEditorModule,
    ActivitiesRoutingModule
  ],
  providers: [
    ActivityService,
    ActivityTypeService,
    AccessibilityService,
    DifficultyService
  ]
})
export class ActivitiesModule { }
