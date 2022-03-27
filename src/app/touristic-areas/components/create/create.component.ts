import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@assets/ckeditor/ckeditor.js';
import { ToastrService } from 'ngx-toastr';
import { TouristicAreasService, TypeTouristAreaService } from '../../services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(300)]),
    id_type_tourist_area: new FormControl(0, [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1014)]),
    images: new FormControl([]),
    geom: new FormControl('', [Validators.required]),
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
    private touristicAreasService: TouristicAreasService,
    private typeTouristAreaService: TypeTouristAreaService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.types = [];
    this.id = this.activatedroute.snapshot.paramMap.get('id');
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.getTypeTouristArea();
    if (this.id) {
      this.getTouristicArea();
    }
  }

  private getTouristicArea() {
    this.touristicAreasService.find(this.id).subscribe(result => {
      if (result.success && result.data) {
        let area = result.data;
        this.form.controls.name.setValue(area.name);
        this.form.controls.id_type_tourist_area.setValue(area.id_type_tourist_area);
        this.form.controls.description.setValue(area.description);
        this.form.controls.images.setValue(area.touristic_area_images.filter(e => e.url));
        this.form.controls.geom.setValue(area.geom);
      }
    })
  }

  private getTypeTouristArea() {
    this.typeTouristAreaService.list(null).subscribe(result => {
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
    this.touristicAreasService.create(data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Guardado');
        this.router.navigate(['/dashboard', 'touristic-areas'], { queryParamsHandling: 'preserve' })
      }
    })
  }


  private update(data) {
    this.touristicAreasService.update(this.id, data).subscribe(result => {
      if (result.success) {
        this.toastService.success('Guardado');
        this.router.navigate(['/dashboard', 'touristic-areas'], { queryParamsHandling: 'preserve' })
      }
    })
  }

}
