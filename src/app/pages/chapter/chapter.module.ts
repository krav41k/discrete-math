import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { ChapterOverviewComponent } from './overview/overview.component';

const routes: Route[] = [
  {
    path: ':id/overview',
    component: ChapterOverviewComponent,
  },
  {
    path: ':id',
    redirectTo: ':id/overview'
  }
];

@NgModule({
  declarations: [ChapterOverviewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class ChapterModule {}
