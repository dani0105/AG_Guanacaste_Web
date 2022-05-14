import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcceptDialog } from 'src/app/shared/dialogs';
import { EducationProgramService } from '../../services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent{

  private columns: string[] = ['name', 'education_program_type', 'actions'];
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
    private toastSerice: ToastrService,
    public dialog: MatDialog,
    private activatedroute: ActivatedRoute,
    private educationProgramService: EducationProgramService
  ) {
    this.pagination = {};
    this.isLoading = false;
    this.searchControl = new FormControl('', [Validators.minLength(3)]);

    this.activatedroute.queryParams.subscribe(params => {
      this.pagination.page = params.page || 0;
      this.pagination.size = params.size || 25;
      this.pagination.filter = params.filter || '';
      this.getActivities();
    })
  }

  private getActivities() {
    this.isLoading = true;
    this.educationProgramService.list(this.pagination).subscribe(result => {
      this.isLoading = false;
      if (result.success) {
        this.dataSource.data = result.data;
        this.pagination = result.metadata;
      }
    });
  }

  delete(element) {
    const ref = this.dialog.open(AcceptDialog);
    ref.afterClosed().toPromise().then(result => {
      if (result) {
        this.educationProgramService.delete(element.id).subscribe(result => {
          if (result.success) {
            this.removeElement(element);
            this.toastSerice.success('Removido');
          }
        })
      }
    });

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
