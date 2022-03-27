import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { optionalValue } from '@core/validators/optional.validator';
import { UserService } from '../../services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private form = new FormGroup({
    name: new FormControl(this.data.object.name, [Validators.required]),
    email: new FormControl(this.data.object.email, [Validators.required, Validators.email]),
    password: new FormControl('', [optionalValue(this.data.isEditing), Validators.minLength(8)]),
    id_rol: new FormControl(this.data.object.id_rol, [Validators.required]),
  });

  public get Form(): FormGroup {
    return this.form;
  }


  constructor(
    private dialogRef: MatDialogRef<CreateComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }


  onSubmit(data) {
    if (this.data.isEditing) {
      this.update(data);
    } else {
      this.create(data);
    }
  }

  private create(data) {
    this.userService.create(data).subscribe(result => {
      if (result.success) {
        result.data.rol = this.searchRol(result.id_rol);
        this.dialogRef.close({ object: result.data });
      }
    })
  }

  private update(data) {
    this.userService.update(this.data.object.id, data).subscribe(result => {
      if (result.success) {
        data.id = this.data.object.id;
        data.rol = this.searchRol(data.id_rol);
        this.dialogRef.close({ object: data });
      }
    })
  }

  private searchRol(id_rol){
    return this.data.roles.filter(element=> element.id == id_rol)[0];
  }

}

interface DialogData {
  object: any,
  isEditing: boolean,
  roles: any[]
}