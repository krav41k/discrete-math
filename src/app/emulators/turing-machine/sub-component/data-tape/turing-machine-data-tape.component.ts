import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'dm-turing-machine-data-tape',
  templateUrl: './turing-machine-data-tape.component.html',
  styleUrls: ['./turing-machine-data-tape.component.scss']
})
export class TuringMachineDataTapeComponent implements AfterViewInit, OnDestroy {
  @ViewChild(CdkVirtualScrollViewport) viewport?: CdkVirtualScrollViewport;
  @ViewChild('viewportRef', { read: ElementRef }) viewportRef?: ElementRef;
  items = Array.from({length: 2001});
  public currentIndex = 1000;
  public itemWidth = 44;
  public viewportWidth?: number;


  destroyed$ = new ReplaySubject();

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.updateViewportWidth();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  @Input() set onMoveLeft(value: unknown) {
    if (!value) {
      return;
    }
    this.currentIndex = Math.max(0, this.currentIndex - 1);
    this.scrollToIndex();
  }

  @Input() set onMoveRight(value: unknown) {
    if (!value) {
      return;
    }
    this.currentIndex = Math.min(this.items.length, this.currentIndex + 1);
    this.scrollToIndex();
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
    // console.log(this.viewport);
    // this.viewPort?.scrollToIndex(1000, "smooth");
    setTimeout(() => this.viewport?.scrollToIndex(this.currentIndex - Math.floor(this.viewportWidth! / this.itemWidth / 2) + 1, "smooth"), 100)

    console.log('scrolled');
  }

  scrollLeft() {
    this.currentIndex--;
    this.scrollToIndex();
  }

  scrollRight() {
    this.currentIndex++;
    this.scrollToIndex();
  }
}
