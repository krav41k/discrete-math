import { Component } from '@angular/core';
import { ChaptersDataService } from '../../shared/services/chapters/chapters-data.service';
import { ChapterModel } from '../chapter/data/chapter.model';
import { chapter1 } from '../chapter/data/chapter1';
import { chapter2 } from '../chapter/data/chapter2';
import { chapter5 } from '../chapter/data/chapter5';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  chapters: ChapterModel[] = [...this.chapterDataService.chaptersMap.values()];
  constructor(private chapterDataService: ChaptersDataService) {}
}
