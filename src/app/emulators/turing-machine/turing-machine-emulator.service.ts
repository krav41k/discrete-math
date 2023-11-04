import { Injectable } from '@angular/core';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';
import { TuringMachineStatesService } from './turing-machine-states.service';

@Injectable()
export class TuringMachineEmulatorService {

  constructor(private tmStatesService: TuringMachineStatesService) {}

  onStart(): void {
    this.tmStatesService.programState = TuringMachineProgramStateEnum.running;
    this.tmStatesService.addMessageToConsole( 'Program is running');
  }

  onStop(): void {
    this.tmStatesService.programState = TuringMachineProgramStateEnum.idle
    this.tmStatesService.addMessageToConsole('Program is finished');
  }

  onPause(): void {
    this.tmStatesService.programState = TuringMachineProgramStateEnum.paused;
    this.tmStatesService.addMessageToConsole('Program is paused');
  }

  private emulate(): void {
    // this.tmStateService.
  }

  private getCurrentTapeValue(): string {
    return this.tmStatesService.dataTapeItems[this.tmStatesService.currentIndex$.value || 0];
  }
}
