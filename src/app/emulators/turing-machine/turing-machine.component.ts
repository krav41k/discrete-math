import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { removeDuplicates } from '../../shared/functions/remove-duplicates';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineEmulatorService } from './turing-machine-emulator.service';
import { TuringMachineMovementDirectionEnum } from './turing-machine-movement-direction.enum';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';
import { TuringMachineStatesService } from './turing-machine-states.service';

@Component({
  templateUrl: './turing-machine.component.html',
  styleUrls: ['./turing-machine.component.scss', './turing-machine-table.scss', './turing-machine-data-tape.scss']
})
export class TuringMachineComponent implements OnDestroy {
  selectedCommand?: TuringMachineCommandModel;

  tmStatesEnum = TuringMachineProgramStateEnum;
  destroyed$ = new ReplaySubject(1);

  constructor(public tmEmulatorService: TuringMachineEmulatorService, public tmStatesService: TuringMachineStatesService) {}

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  openAlphabetPromptWindow(): void {
    const input = window.prompt("Enter alphabet:", this.tmStatesService.alphabet)
    this.tmStatesService.onAlphabetChange(input || '');
  }

  onMenuClick($event: Event, action: string, option: string) {
    $event.stopPropagation();
    if (!this.selectedCommand) {
      return;
    }

    switch (action) {
      case 'command':
        this.selectedCommand.nextCommand = +option;
        break;
      case 'finish':
        this.selectedCommand.completeProgram = !this.selectedCommand.completeProgram;
        break;
      case 'move':
        this.selectedCommand.direction = option as TuringMachineMovementDirectionEnum;
        break;
      case 'write':
        this.selectedCommand.write = option;
        break;
    }

    this.tmStatesService.saveProgram();
  }

  onOpenedMenu(column: number, row: string): void {
    let selectedCommand = this.tmStatesService.program[row][column];
    if (!selectedCommand) {
      selectedCommand = this.tmStatesService.program[row][column] = {};
    }
    this.selectedCommand = selectedCommand;
  }

  onStep(): void {}
}
