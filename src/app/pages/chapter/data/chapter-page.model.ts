export interface ChapterPageModel {
  title: string,
  content: {
    type: 'text' | 'image';
    content: string;
  }[];
}
