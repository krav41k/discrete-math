import { Injectable } from '@angular/core';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';
import { TuringMachineStatesService } from './turing-machine-states.service';

@Injectable()
export class TuringMachineEmulatorService {
  private commandN = 0;
  private delay = 250;
  private lastCommand?: TuringMachineCommandModel;

  constructor(private tmStatesService: TuringMachineStatesService) {}

  onStart(): void {
    this.tmStatesService.programState = TuringMachineProgramStateEnum.running;
    this.tmStatesService.addMessageToConsole( 'Program is running');
    this.emulate();
  }

  onStop(): void {
    if (this.lastCommand) {
      this.lastCommand.isTarget = false;
      this.lastCommand = undefined;
    }
    this.tmStatesService.applyDataTape();
    this.commandN = 0;
    this.tmStatesService.programState = TuringMachineProgramStateEnum.idle
    this.tmStatesService.addMessageToConsole('Program is stopped');
  }

  onPause(): void {
    this.tmStatesService.programState = TuringMachineProgramStateEnum.paused;
    this.tmStatesService.addMessageToConsole('Program is paused');
  }

  private emulate(): void {
    const command = this.tmStatesService.program[this.getCurrentTapeValue()][this.commandN];
    if (!command) {
      this.onFail('Command is missing');
      return;
    }

    this.runCommand(command);
    if (command.completeProgram) {
      this.onFinished();
      return;
    }

    setTimeout(() => this.emulate(), this.delay);
  }

  private getCurrentTapeValue(): string {
    return this.tmStatesService.dataTapeItems[this.tmStatesService.currentIndex$.value || 0] || ' ';
  }

  private runCommand(command: TuringMachineCommandModel): void {
    if (this.lastCommand) {
      this.lastCommand.isTarget = false;
    }
    this.lastCommand = command;
    command.isTarget = true;

    this.tmStatesService.dataTapeItems[this.tmStatesService.currentIndex$.value] = command.write || ' ';

    switch (command.direction) {
      case 'left':
        this.tmStatesService.onMoveTapeLeft();
        break;
      case 'right':
        this.tmStatesService.onMoveTapeRight();
        break;
    }

    if (command.completeProgram) {
      return;
    }

    if (command.nextCommand === undefined) {
      this.onFail('The next command is not specified');
      return;
    }
    this.commandN = command.nextCommand;
  }

  private onFail(message: string): void {
    this.tmStatesService.addMessageToConsole('Error: '+message);
    this.onStop();
  }

  private onFinished(): void {
    this.tmStatesService.programState = TuringMachineProgramStateEnum.finished;
    this.tmStatesService.addMessageToConsole('Program is finished');
  }
}
