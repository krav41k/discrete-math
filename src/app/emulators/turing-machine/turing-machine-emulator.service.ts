import { Injectable } from '@angular/core';
import { TuringMachineStatesService } from './turing-machine-states.service';

@Injectable()
export class TuringMachineEmulatorService {

  constructor(private tmStateService: TuringMachineStatesService) {}

  onStart(): void {

  }

  onStop(): void {}

  onPause(): void {}
}
