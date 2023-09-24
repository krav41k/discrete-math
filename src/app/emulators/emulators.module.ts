import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { TuringMachineComponent } from './turing-machine/turing-machine.component';

const routes: Route[] = [
  {
    path: 'turing-machine',
    component: TuringMachineComponent,
  },
];

@NgModule({
  declarations: [TuringMachineComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class EmulatorsModule {}
