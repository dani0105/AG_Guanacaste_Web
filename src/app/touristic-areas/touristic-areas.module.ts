import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TouristicAreasRoutingModule } from './touristic-areas-routing.module';
import { ListComponent } from './components';
import { CreateComponent } from './components/create/create.component';


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    TouristicAreasRoutingModule
  ]
})
export class TouristicAreasModule { }
