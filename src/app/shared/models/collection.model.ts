export interface ICollection {
    _id?: string,
    user_id: string,
    parent_id: string | null,
    name: string,
    currentImage: string,
    images: string[],
    date: Date,
    fullLearned?: boolean;
    wordsCount?: number;
  }
  