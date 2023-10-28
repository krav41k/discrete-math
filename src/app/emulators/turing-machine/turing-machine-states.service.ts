import { Injectable } from '@angular/core';
import { removeDuplicates } from '../../shared/functions/remove-duplicates';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';

@Injectable()
export class TuringMachineStatesService {
  private alphabetArr: string[] = [];

  columns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  displayedColumns = ['row-header', ...this.columns.map(n => `Q${n}`)];
  rowHeaders = ["x", "y", "z"];
  dataSource = this.rowHeaders;

  alphabet = '';
  isProgramCreate = false;
  program: { [k: string]: (TuringMachineCommandModel | null )[] } = {};
  programState = TuringMachineProgramStateEnum.idle;

  constructor() {
    const alphabet = this.localStorageAlphabet;
    if (alphabet.length > 0) {
      this.onAlphabetChange(alphabet);
    }
  }

  onAlphabetChange(newAlphabet: string): void {
    if (newAlphabet.length < 1) {
      return;
    }
    newAlphabet = removeDuplicates(newAlphabet)+' ';
    const newAlphabetArr = newAlphabet.split('');
    // const removedChars = this.alphabetArr.filter(char => !newAlphabetArr.includes(char));
    // console.log(removedChars);
    this.isProgramCreate = false;
    this.localStorageAlphabet = newAlphabet;
    this.alphabet = newAlphabet;
    this.alphabetArr = newAlphabetArr;
    this.dataSource = this.rowHeaders = newAlphabetArr;

    this.fillProgramArr();
  }

  private fillProgramArr(): void {
    this.program = {};
    this.alphabetArr.forEach(char => this.program[char] = Array(this.columns.length).fill(null));
    this.isProgramCreate = true
  }

  private get localStorageAlphabet(): string {
    return localStorage.getItem('alphabet') || '';
  }

  private set localStorageAlphabet(newAlphabet: string) {
    localStorage.setItem('alphabet', newAlphabet);
  }
}
