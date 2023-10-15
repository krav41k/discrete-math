import { TuringMachineMovementDirectionEnum } from './turing-machine-movement-direction.enum';

export interface TuringMachineCommandModel {
  completeProgram?: boolean
  direction: TuringMachineMovementDirectionEnum,
  nextCommand: number,
  write: string,
}
