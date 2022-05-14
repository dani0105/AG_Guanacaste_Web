import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from '../../dialogs';
import { RolService, UserService } from '../../services';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcceptDialog } from 'src/app/shared/dialogs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  private columns: string[] = ['email', 'name', 'rol', 'actions'];
  private dataSource = new MatTableDataSource<any>([]);
  private roles: any[];
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
    public dialog: MatDialog,
    private userService: UserService,
    private router: Router,
    private toastService:ToastrService,
    private activatedroute: ActivatedRoute,
    private rolService: RolService
  ) {
    this.pagination = {};
    this.isLoading = false;
    this.searchControl = new FormControl('', [Validators.minLength(3)]);

    this.activatedroute.queryParams.subscribe(params => {
      this.pagination.page = params.page || 0;
      this.pagination.size = params.size || 25;
      this.pagination.filter = params.filter || '';
      this.getusers();
    })
  }

  ngOnInit(): void {
    this.getRoles();
  }

  private getusers() {
    this.isLoading = true;
    this.userService.list(this.pagination).subscribe(result => {
      this.isLoading = false;
      if (result.success) {
        this.dataSource.data = result.data;
        this.pagination = result.metadata;
      }
    });
  }

  private getRoles() {
    this.rolService.list().subscribe(result => {
      if (result.success) {
        this.roles = result.data;
      }
    });
  }

  create() {
    let ref = this.dialog.open(CreateComponent, {
      width: '350px',
      panelClass: 'rounded-lg',
      data: {
        roles: this.roles,
        object: {},
        isEditing: false
      }
    });

    ref.afterClosed().subscribe(result => {
      if (result && result.object) {
        console.log(result);
        this.addElement(result.object);
        this.toastService.success('Guardado');
      }
    });
  }

  update(user: any) {
    let ref = this.dialog.open(CreateComponent, {
      width: '350px',
      panelClass: 'rounded-lg',
      data: {
        roles: this.roles,
        object: user,
        isEditing: true
      }
    });

    ref.afterClosed().subscribe(result => {
      if (result && result.object) {
        this.removeElement(user);
        this.addElement(result.object);
        this.toastService.success('Guardado');
      }
    });
  }

  delete(element) {
    const ref = this.dialog.open(AcceptDialog);

    ref.afterClosed().toPromise().then( result =>{
      if(result){
        this.userService.delete(element.id).subscribe(result => {
          if (result.success) {
            this.removeElement(element);
            this.toastService.success('Removido');
          }
        });
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
