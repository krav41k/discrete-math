import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ReplaySubject, skip, Subject, takeUntil, tap } from 'rxjs';
import { TuringMachineStatesService } from '../../turing-machine-states.service';

@Component({
  selector: 'dm-turing-machine-data-tape',
  templateUrl: './turing-machine-data-tape.component.html',
  styleUrls: ['./turing-machine-data-tape.component.scss']
})
export class TuringMachineDataTapeComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;
  @ViewChild('viewportRef', { read: ElementRef }) viewportRef?: ElementRef;
  itemWidth = 44;
  viewportWidth?: number;


  destroyed$ = new ReplaySubject();

  constructor(private elementRef: ElementRef, public tmStateService: TuringMachineStatesService) {}

  ngAfterViewInit() {
    this.updateViewportWidth();

    this.tmStateService.currentIndex$.pipe(
      takeUntil(this.destroyed$),
      skip(1),
      tap(() => this.scrollToIndex())
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateViewportWidth();
  }

  updateViewportWidth() {
    this.viewportWidth = this.elementRef.nativeElement.parentElement.clientWidth;
    console.log(this.viewportWidth);
    this.scrollToIndex();
  }

  scrollToIndex() {
    if (!this.viewportWidth || !this.viewportRef) {
      return;
    }
    setTimeout(() => this.viewport?.scrollToIndex(this.tmStateService.currentIndex$.value - Math.floor(this.viewportWidth! / this.itemWidth / 2) + 1, "smooth"), 100)

    console.log('scrolled');
  }
}
