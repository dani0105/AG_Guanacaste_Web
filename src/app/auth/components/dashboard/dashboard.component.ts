import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private menu_items: any[];
  private menu_state: boolean;

  public get Menu(): any[] {
    return this.menu_items;
  }

  public get MenuState(): boolean {
    return this.menu_state;
  }

  constructor(private userService: UserService,
    private router: Router,) {
    this.menu_items = [
      { link: 'users', label: 'Usuarios' },
      { link: 'touristic-areas', label: 'Áreas Turisticas' },
      { link: 'activities', label: 'Actividades' },
      { link: 'education-programs', label: 'Programas Educativos' }
    ];
    this.menu_state = false;
  }

  ngOnInit(): void {
  }

  public toggleMenu() {
    this.menu_state = !this.menu_state;
  }


  public logout() {
    this.userService.logout();
    this.router.navigate(['/'])
  }
}
