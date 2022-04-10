import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@assets/ckeditor/ckeditor';
import { ToastrService } from 'ngx-toastr';
import { AccessibilityService, ActivityService, ActivityTypeService, DifficultyService } from '../../services';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    id_activity_type: new FormControl(0, [Validators.required]),
    id_difficulty: new FormControl(0, [Validators.required]),
    id_accessibility: new FormControl(0, [Validators.required]),
    direction: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    requirement: new FormControl('', [Validators.required, Validators.maxLength(1014)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1014)]),
    images: new FormControl([]),
    geom: new FormControl('', [Validators.required]),
  });

  public types: any[];
  public difficulties: any[];
  public accessibilities: any[];

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
    private activityService: ActivityService,
    private activityTypeService: ActivityTypeService,
    private difficultyService: DifficultyService,
    private accessibilityService: AccessibilityService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.types = [];
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getActivityType();
    this.getDifficulties();
    this.getAccessibility();
    
    if (this.id) {
      this.getActivities();
    }
  }

  private getActivities() {
    this.activityService.find(this.id).subscribe(result => {
      if (result.success && result.data) {
        let data = result.data;
        this.form.controls.name.setValue(data.name);
        this.form.controls.id_activity_type.setValue(data.id_activity_type);
        this.form.controls.id_difficulty.setValue(data.id_difficulty);
        this.form.controls.id_accessibility.setValue(data.id_accessibility);
        this.form.controls.direction.setValue(data.direction);
        this.form.controls.requirement.setValue(data.requirement);
        this.form.controls.description.setValue(data.description);
        this.form.controls.images.setValue(data.activity_images.filter(e => e.url));
        this.form.controls.geom.setValue(data.geom);
      }
    })
  }

  private getDifficulties() {
    this.difficultyService.list(null).subscribe(result => {
      if (result.success) {
        this.difficulties = result.data;
      }
    })
  }

  private getAccessibility() {
    this.accessibilityService.list(null).subscribe(result => {
      if (result.success) {
        this.accessibilities = result.data;
      }
    })
  }

  private getActivityType() {
    this.activityTypeService.list(null).subscribe(result => {
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
    this.activityService.create(data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Guardado');
        this.router.navigate(['/dashboard', 'activities'], { queryParamsHandling: 'preserve' })
      }
    })
  }


  private update(data) {
    this.activityService.update(this.id, data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Guardado');
        this.router.navigate(['/dashboard', 'activities'], { queryParamsHandling: 'preserve' })
      }
    })
  }
}
