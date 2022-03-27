import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneComponent, MapComponent } from './components';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { ImagePipe } from './pipes';

@NgModule({
  declarations: [
    DropzoneComponent,
    MapComponent,
    ImagePipe,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DropzoneComponent,
    MapComponent,
    ImagePipe
  ]
})
export class SharedModule { }
