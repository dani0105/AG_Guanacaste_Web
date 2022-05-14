import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneComponent, MapComponent } from './components';
import { AcceptDialog } from './dialogs';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ImagePipe } from './pipes';
import {MatDialogModule} from '@angular/material/dialog';


const getDutchPaginatorIntl = () => {
  const paginatorIntl = new MatPaginatorIntl();
  paginatorIntl.itemsPerPageLabel = 'Items por página:';
  paginatorIntl.nextPageLabel = 'Siguiente';
  paginatorIntl.previousPageLabel = 'Anterior';
  return paginatorIntl;
}

@NgModule({
  declarations: [
    DropzoneComponent,
    MapComponent,
    AcceptDialog,
    ImagePipe,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DropzoneComponent,
    MatPaginatorModule,
    MapComponent,
    AcceptDialog,
    ImagePipe
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() }
  ]
})
export class SharedModule { }
