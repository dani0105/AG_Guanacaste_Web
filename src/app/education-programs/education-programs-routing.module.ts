import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ListComponent, CreateComponent
} from './components';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'create', component: CreateComponent },
  { path: ':id/update', component: CreateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationProgramsRoutingModule { }
