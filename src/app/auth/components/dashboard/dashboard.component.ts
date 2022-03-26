import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private menu_items: any[];
  
  public get Menu() : any[] {
    return this.menu_items;
  }
  

  constructor() {
    this.menu_items = [
      { link: 'users', label: 'Usuarios' },
      { link: 'touristic-areas', label: 'Áreas Turisticas' }
    ]
  }

  ngOnInit(): void {
  }

}
