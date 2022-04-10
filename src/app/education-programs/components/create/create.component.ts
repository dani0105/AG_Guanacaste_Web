import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@assets/ckeditor/ckeditor';
import { ToastrService } from 'ngx-toastr';
import { EducationProgramService, EducationProgramTypeService } from '../../services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1014)]),
    geom: new FormControl('', [Validators.required]),
    id_education_program_type: new FormControl(0, [Validators.required]),
    goal: new FormControl('', [Validators.required, Validators.maxLength(1014)]),
    inscription_link: new FormControl('', [Validators.required, Validators.maxLength(1014)]),
    requirement: new FormControl('', [Validators.required, Validators.maxLength(1024)]),
    direction: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    images: new FormControl([]),
  });

  public types: any[];

  private editor = ClassicEditor;

  public get Editor(): any {
    return this.editor;
  }

  public get Form(): FormGroup {
    return this.form;
  }

  private id: string;
  public isLoading: boolean;

  constructor(
    private educationProgramService: EducationProgramService,
    private educationProgramTypeService: EducationProgramTypeService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.types = [];
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getEducationProgramType();
    if (this.id) {
      this.getActivities();
    }
  }

  private getActivities() {
    this.educationProgramService.find(this.id).subscribe(result => {
      if (result.success && result.data) {
        let data = result.data;

        this.form.controls.name.setValue(data.name);
        this.form.controls.description.setValue(data.description);
        this.form.controls.id_education_program_type.setValue(data.id_education_program_type);
        this.form.controls.goal.setValue(data.goal);
        this.form.controls.inscription_link.setValue(data.inscription_link);
        this.form.controls.requirement.setValue(data.requirement);
        this.form.controls.direction.setValue(data.direction);
        this.form.controls.images.setValue(data.education_program_images.filter(e => e.url));
        this.form.controls.geom.setValue(data.geom);
      }
    })
  }

  private getEducationProgramType() {
    this.educationProgramTypeService.list(null).subscribe(result => {
      if (result.success) {
        this.types = result.data;
      }
    })
  }

  public onSubmit(value: any) {
    if (this.id) {
      this.update(value);
    } else {
      this.create(value);
    }
  }

  private create(data) {
    this.educationProgramService.create(data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Guardado');
        this.router.navigate(['/dashboard', 'education-program'], { queryParamsHandling: 'preserve' })
      }
    })
  }


  private update(data) {
    this.educationProgramService.update(this.id, data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Guardado');
        this.router.navigate(['/dashboard', 'education-program'], { queryParamsHandling: 'preserve' })
      }
    })
  }

}
