import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { removeDuplicates } from '../../shared/functions/remove-duplicates';
import { TuringMachineCommandModel } from './turing-machine-command.model';
import { TuringMachineMovementDirectionEnum } from './turing-machine-movement-direction.enum';

@Component({
  templateUrl: './turing-machine.component.html',
  styleUrls: ['./turing-machine.component.scss', './turing-machine-table.scss']
})
export class TuringMachineComponent implements OnDestroy {
  rowHeaders = ["x", "y", "z"];
  columns = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  displayedColumns = ['row-header', ...this.columns.map(n => `Q${n}`)];
  dataSource = this.rowHeaders;

  private alphabetArr: string[] = [];
  alphabet = '';
  isProgramCreate = false;
  program: { [k: string]: (TuringMachineCommandModel | null )[] } = {};
  selectedItem?: { column: number, row: string };

  destroyed$ = new ReplaySubject(1);

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAlphabetChange(newAlphabet: string): void {
    newAlphabet = removeDuplicates(newAlphabet)+' ';
    const newAlphabetArr = newAlphabet.split('');
    // const removedChars = this.alphabetArr.filter(char => !newAlphabetArr.includes(char));
    // console.log(removedChars);
    this.isProgramCreate = false;
    this.alphabet = newAlphabet;
    this.alphabetArr = newAlphabetArr;
    this.dataSource = this.rowHeaders = newAlphabetArr;

    this.fillProgramArr();
  }

  openAlphabetPromptWindow(): void {
    const input = window.prompt("Enter alphabet:", this.alphabet)
    this.onAlphabetChange(input || '');
  }

  onMenuClick($event: Event, action: string, option: string) {
    $event.stopPropagation();
    if (!this.selectedItem) {
      return;
    }
    let command = this.program[this.selectedItem.row][this.selectedItem.column];
    if (!command) {
      command = this.program[this.selectedItem.row][this.selectedItem.column] = {};
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

  private fillProgramArr(): void {
    this.program = {};
    this.alphabetArr.forEach(char => this.program[char] = Array(this.columns.length).fill(null));
    this.isProgramCreate = true
  }
}
