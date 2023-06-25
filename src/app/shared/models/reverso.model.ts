export interface IReverso {
    text: string,
    translations: string[],
    examples: IContextExample[], 
}


export interface IContextExample {
    id: number,
    source: string,
    target: string,
}





