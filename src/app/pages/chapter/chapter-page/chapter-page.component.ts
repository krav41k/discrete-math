import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChaptersDataService } from '../../../shared/services/chapters/chapters-data.service';
import { ChapterPageModel } from '../data/chapter-page.model';

@Component({
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss']
})
export class ChapterPageComponent {
  data!: ChapterPageModel;
  constructor(private activeRoute: ActivatedRoute, private chapterDataService: ChaptersDataService) {}

  ngOnInit(): void {
    const id = +(this.activeRoute.snapshot.paramMap.get('id') || -1);
    const pageId = +(this.activeRoute.snapshot.paramMap.get('pageId') || -1);
    const data = this.chapterDataService.chaptersMap.get(id)?.pages;
    if (data) {
      this.data = data[pageId];
    }
  }
}
