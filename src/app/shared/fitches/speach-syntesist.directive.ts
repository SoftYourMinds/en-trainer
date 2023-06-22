import { Directive, Input, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[speachSyntesist]',
})
export class SpeachSyntesistDirective {
  @Input('speachText') text: string;
  
  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    this.speakText();
  }

  @HostListener('keydown.space')
  onKeyDown() {
    this.speakText();
  }

  speakText(): void {
    const utterance = new SpeechSynthesisUtterance(this.text);
    utterance.lang = 'en-US';
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    speechSynthesis.speak(utterance);
  }

}
