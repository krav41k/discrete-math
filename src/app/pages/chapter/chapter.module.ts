import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ChapterOverviewComponent } from './overview/overview.component';

const routes: Route[] = [
  {
    path: ':id/overview',
    component: ChapterOverviewComponent,
  }
];

@NgModule({
  declarations: [ChapterOverviewComponent],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class ChapterModule {}
