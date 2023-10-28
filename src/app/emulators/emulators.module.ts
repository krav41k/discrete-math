import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import {
  TuringMachineDataTapeComponent
} from './turing-machine/sub-component/data-tape/turing-machine-data-tape.component';
import { TuringMachineComponent } from './turing-machine/turing-machine.component';

const routes: Route[] = [
  {
    path: 'turing-machine',
    component: TuringMachineComponent,
  },
];

@NgModule({
  declarations: [TuringMachineComponent, TuringMachineDataTapeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
})
export class EmulatorsModule {}
