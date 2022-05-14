import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptDialog{

  constructor(
    private dialogRef: MatDialogRef<AcceptDialog>,
  ) {
    
  } 

}
