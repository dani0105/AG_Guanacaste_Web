import { Component, OnInit } from '@angular/core';

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


  constructor() {
    this.menu_items = [
      { link: 'users', label: 'Usuarios' },
      { link: 'touristic-areas', label: 'Áreas Turisticas' }
    ];
    this.menu_state = false;
  }

  ngOnInit(): void {
  }

  public toggleMenu(){
    this.menu_state = !this.menu_state;
  }
}
