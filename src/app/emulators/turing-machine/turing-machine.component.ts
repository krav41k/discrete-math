import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { removeDuplicates } from '../../shared/functions/remove-duplicates';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineMovementDirectionEnum } from './turing-machine-movement-direction.enum';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';
import { TuringMachineStatesService } from './turing-machine-states.service';

@Component({
  templateUrl: './turing-machine.component.html',
  styleUrls: ['./turing-machine.component.scss', './turing-machine-table.scss', './turing-machine-data-tape.scss']
})
export class TuringMachineComponent implements OnDestroy {
  selectedItem?: { column: number, row: string };

  dataTapeMoveLeft?: number;
  dataTapeMoveRight?: number;
  tmStatesEnum = TuringMachineProgramStateEnum;
  destroyed$ = new ReplaySubject(1);

  constructor(public tmStatesService: TuringMachineStatesService) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  get timestamp(): number {
    return new Date().getTime();
  }

  openAlphabetPromptWindow(): void {
    const input = window.prompt("Enter alphabet:", this.tmStatesService.alphabet)
    this.tmStatesService.onAlphabetChange(input || '');
  }

  onMenuClick($event: Event, action: string, option: string) {
    $event.stopPropagation();
    if (!this.selectedItem) {
      return;
    }
    let command = this.tmStatesService.program[this.selectedItem.row][this.selectedItem.column];
    if (!command) {
      command = this.tmStatesService.program[this.selectedItem.row][this.selectedItem.column] = {};
    }
    // console.log(data);
    console.log(action, option);
    switch (action) {
      case 'write':
        command.write = option;
        break;
      case 'move':
        command.direction = option as TuringMachineMovementDirectionEnum;
        break;
      case 'command':
        command.nextCommand = +option;
        break;
    }
  }

  onOpenedMenu(column: number, row: string): void {
    this.selectedItem = { column, row };
  }

  onStart(): void {
    this.tmStatesService.programState = this.tmStatesEnum.running;
  }

  onStop(): void {
    this.tmStatesService.programState = this.tmStatesEnum.idle
  }

  onPause(): void {
    this.tmStatesService.programState = this.tmStatesEnum.paused;
  }

  onStep(): void {}
}
