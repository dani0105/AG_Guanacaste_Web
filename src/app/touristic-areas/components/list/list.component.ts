import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TouristicAreasService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private columns: string[] = ['name', 'type_area', 'actions'];
  private dataSource = new MatTableDataSource<any>([]);
  public searchControl: FormControl;
  public pagination: any;
  public isLoading: boolean;

  public get Columns(): string[] {
    return this.columns;
  }

  public get Data(): MatTableDataSource<any> {
    return this.dataSource;
  }

  constructor(
    private router: Router,
    private touristicAreasService: TouristicAreasService,
    private toastSerice:ToastrService,
    private activatedroute: ActivatedRoute
  ) {
    this.pagination = {};
    this.isLoading = false;
    this.searchControl = new FormControl('', [Validators.minLength(3)]);

    this.activatedroute.queryParams.subscribe(params => {
      this.pagination.page = params.page || 0;
      this.pagination.size = params.size || 25;
      this.pagination.filter = params.filter || '';
      this.getTouristicAreas();
    })
  }

  ngOnInit(): void {
  }

  private getTouristicAreas() {
    this.isLoading = true;
    this.touristicAreasService.list(this.pagination).subscribe(result => {
      this.isLoading = false;
      if (result.success) {
        this.dataSource.data = result.data;
        this.pagination = result.metadata;
      }
    });
  }

  delete(element) {
    this.touristicAreasService.delete(element.id).subscribe(result => {
      if (result.success) {
        this.removeElement(element);
        this.toastSerice.success('Removido');
      }
    })
  }

  private addElement(element) {
    const data = this.dataSource.data;
    data.push(element);
    this.dataSource.data = data;
  }

  private removeElement(element) {
    this.dataSource.data = this.dataSource.data.filter(row => row != element);
  }

  search() {
    this.router.navigate([], {
      relativeTo: this.activatedroute,
      queryParams: { filter: this.searchControl.value },
      queryParamsHandling: 'merge'
    });
  }

  onPageChanged(event) {
    this.router.navigate([], {
      relativeTo: this.activatedroute,
      queryParams: { size: event.pageSize, page: event.pageIndex },
      queryParamsHandling: 'merge'
    });
  }
}
