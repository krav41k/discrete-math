import { ChapterPageModel } from './chapter-page.model';

export interface ChapterModel {
  description: string;
  disabled?: boolean;
  id: number;
  pages?: ChapterPageModel[];
  title: string;
  thumbnail?: string;
  thumbnailColor?: string;
}
