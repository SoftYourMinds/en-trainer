export interface ICollection {
    user: string,
    name: string,
    currentImage: string,
    images: string[],
    date: Date,
    fullLearned?: boolean;
    wordsCount?: number;
  }
  