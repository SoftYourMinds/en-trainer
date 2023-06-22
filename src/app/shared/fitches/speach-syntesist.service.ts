import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeachSyntesistService {

  constructor() { }

  speakText(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.volume = 1;
    utterance.rate = 0.8;
    utterance.pitch = 0.8;

    speechSynthesis.speak(utterance);
  }
}
