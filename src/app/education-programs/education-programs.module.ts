import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationProgramsRoutingModule } from './education-programs-routing.module';
import {
  ListComponent,
  CreateComponent
} from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SharedModule } from '../shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
  EducationProgramService,
  EducationProgramTypeService
} from './services';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatButtonModule,
    SharedModule,
    CKEditorModule,
    EducationProgramsRoutingModule
  ],
  providers: [
    EducationProgramService,
    EducationProgramTypeService
  ]
})
export class EducationProgramsModule { }
