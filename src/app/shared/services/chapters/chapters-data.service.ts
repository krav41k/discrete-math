import { Injectable } from '@angular/core';
import { ChapterModel } from '../../../pages/chapter/data/chapter.model';
import { chapter2 } from '../../../pages/chapter/data/chapter2/chapter2';
import { chapter5 } from '../../../pages/chapter/data/chapter5/chapter5';

@Injectable({
  providedIn: 'root'
})
export class ChaptersDataService {
  chaptersMap = new Map<number, ChapterModel>([
    // [1, chapter1],
    [2, chapter2],
    [5, chapter5],
  ])
}
