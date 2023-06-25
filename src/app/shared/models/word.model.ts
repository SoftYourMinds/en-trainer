import { IContextExample } from "./reverso.model";

export interface IWord {
    _id: string,
    word: string,
    translations: string[],
    phonetic: string,
    examples: IContextExample[],
    currentImage: string,
    images: string[],
    date: Date,
    collection_id: string,
    status: number, 
}

export interface ISendWord {
    word: string, 
    translations: string[], 
    examples: IContextExample[], 
    collection_id: string, 
}