import { Component } from '@angular/core';
import { ChaptersDataService } from '../../shared/services/chapters/chapters-data.service';
import { ChapterModel } from '../chapter/data/chapter.model';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  chapters: ChapterModel[] = [...this.chapterDataService.chaptersMap.values()];
  constructor(private chapterDataService: ChaptersDataService) {}
}
