import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { turingMachineExample1Const } from './examples/turing-machine-example1.const';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineEmulatorService } from './turing-machine-emulator.service';
import { TuringMachineMovementDirectionEnum } from './turing-machine-movement-direction.enum';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';
import { TuringMachineStatesService } from './turing-machine-states.service';

@Component({
  templateUrl: './turing-machine.component.html',
  styleUrls: ['./turing-machine.component.scss', './turing-machine-table.scss', './turing-machine-data-tape.scss']
})
export class TuringMachineComponent implements OnInit, OnDestroy {
  selectedCommand?: TuringMachineCommandModel;

  tmStatesEnum = TuringMachineProgramStateEnum;
  destroyed$ = new ReplaySubject(1);

  constructor(private route: ActivatedRoute, public tmEmulatorService: TuringMachineEmulatorService, public tmStatesService: TuringMachineStatesService) {}

  ngOnInit(): void {
    const { example } = this.route.snapshot.queryParams;
    if (example) {
      this.loadExample(example);
    }
  }

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

  private loadExample(exampleNum: string) {
    switch (exampleNum) {
      case '1':
        const ex = turingMachineExample1Const;
        this.tmStatesService.applyExample(ex.alphabet, ex.dataTapeItems, ex.program);
        break;
      case '2':
        break;
    }

    const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({path:url}, '', url);
  }
}
