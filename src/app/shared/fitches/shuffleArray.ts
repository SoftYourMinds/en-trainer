export function   shuffleArray(array: string[]) {
    const shuffledArray = [...array]; // Створюємо копію масиву
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Міняємо місцями елементи
    }
    return shuffledArray;
}