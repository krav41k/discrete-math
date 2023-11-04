import { J } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { removeDuplicates } from '../../shared/functions/remove-duplicates';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineProgramStateEnum } from './turing-machine-program-state.enum';

@Injectable()
export class TuringMachineStatesService {
  private alphabetArr: string[] = [];

  currentIndex$ = new BehaviorSubject(1000);
  dataTapeItems = Array.from({length: 2001});

  columns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  displayedColumns = ['row-header', ...this.columns.map(n => `Q${n}`)];
  rowHeaders = ["x", "y", "z"];
  dataSource = this.rowHeaders;

  alphabet = '';
  isProgramCreate = false;
  program: { [k: string]: (TuringMachineCommandModel | null )[] } = {};
  programState = TuringMachineProgramStateEnum.idle;

  consoleText = '';

  constructor() {
    const alphabet = this.localStorageAlphabet;
    if (alphabet.length > 0) {
      this.onAlphabetChange(alphabet);
    }

    this.addMessageToConsole('Turing machine states service initialized');
  }

  addMessageToConsole(message: string): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    this.consoleText += `[${formattedTime}]: ${message} \n`;
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

    const savedProgram = this.localStorageProgram;
    if (Object.keys(savedProgram).reduce((acc, cur) => acc += cur) === newAlphabet) {
      this.applyProgram(savedProgram);
      return;
    }

    this.fillProgramArr();
  }

  onMoveTapeLeft(): void {
    this.currentIndex$.next(Math.max(0, this.currentIndex$.value - 1));
  }

  onMoveTapeRight(): void {
    this.currentIndex$.next(Math.min(this.dataTapeItems.length, this.currentIndex$.value + 1));
  }

  saveProgram(): void {
    this.localStorageProgram = this.program;
  }

  private applyProgram(program: { [k: string]: (TuringMachineCommandModel | null )[] }): void {
    this.program = program;
    this.isProgramCreate = true;
  }

  private fillProgramArr(): void {
    this.program = {};
    this.alphabetArr.forEach(char => this.program[char] = Array(this.columns.length).fill(null));
    this.isProgramCreate = true
    this.saveProgram();
  }

  private get localStorageAlphabet(): string {
    return localStorage.getItem('alphabet') || '';
  }

  private set localStorageAlphabet(newAlphabet: string) {
    localStorage.setItem('alphabet', newAlphabet);
  }

  private get localStorageProgram(): { [k: string]: (TuringMachineCommandModel | null )[] } {
    return JSON.parse(localStorage.getItem('program-1') || '{}');
  }

  private set localStorageProgram(newProgram: { [k: string]: (TuringMachineCommandModel | null )[] }) {
    localStorage.setItem('program-1', JSON.stringify(newProgram));
  }
}
