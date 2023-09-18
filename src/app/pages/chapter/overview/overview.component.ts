import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChaptersDataService } from '../../../shared/services/chapters/chapters-data.service';
import { ChapterModel } from '../data/chapter.model';

@Component({
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class ChapterOverviewComponent implements OnInit {
  data!: ChapterModel;
  constructor(private activeRoute: ActivatedRoute, private chapterDataService: ChaptersDataService) {}

  ngOnInit(): void {
    const id = +(this.activeRoute.snapshot.paramMap.get('id') || -1);
    const data = this.chapterDataService.chaptersMap.get(id);
    if (data) {
      this.data = data;
    }
  }
}
