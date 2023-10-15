import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, ReplaySubject, takeUntil } from 'rxjs';
import { removeDuplicates } from '../../shared/functions/remove-duplicates';
import { TuringMachineCommandModel } from './turing-machine-command.model';

@Component({
  templateUrl: './turing-machine.component.html',
  styleUrls: ['./turing-machine.component.scss']
})
export class TuringMachineComponent implements OnDestroy {

  private alphabetArr: string[] = [];
  alphabet = '';
  program: { [k: string]: TuringMachineCommandModel }[] = [];

  destroyed$ = new ReplaySubject(1);

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAlphabetChange(newAlphabet: string): void {
    newAlphabet = removeDuplicates(newAlphabet);
    console.log(newAlphabet);
    const newAlphabetArr = newAlphabet.split('');
    const removedChars = this.alphabetArr.filter(char => !newAlphabetArr.includes(char));
    console.log(removedChars);
    this.alphabet = newAlphabet;
    this.alphabetArr = newAlphabetArr;
  }

  openAlphabetPromptWindow(): void {
    const input = window.prompt("Enter alphabet:", this.alphabet)
    this.onAlphabetChange(input || '');
  }
}
