import { TuringMachineMovementDirectionEnum } from './turing-machine-movement-direction.enum';

export interface TuringMachineCommandModel {
  completeProgram?: boolean
  direction?: TuringMachineMovementDirectionEnum,
  isTarget?: boolean,
  nextCommand?: number,
  write?: string,
}
