import { 
  Component, 
  ElementRef,
  OnInit,
  ViewChild 
} from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  @ViewChild('clouds', { static: true }) clouds: ElementRef;
  @ViewChild('ground', { static: true }) ground: ElementRef;
  @ViewChild('parallax', {static: true }) parallax: ElementRef;

  constructor() {}
  
  ngOnInit(): void {
    this.setMouseParallaxStyle()
  }

  //coef
  forClouds: number = 30
  forGround: number = 10;
  
  speed: number = 0.05;
  
  positionX = 0
  positionY = 0

  coordPercentX = 0
  coordPercentY = 0
  
  setMouseParallaxStyle() {
    const nativeClouds = this.clouds.nativeElement;
    const nativeGround = this.ground.nativeElement;
  
    const distX = this.coordPercentX - this.positionX;
    const distY = this.coordPercentY - this.positionY;
  
    this.positionX = this.positionX + (distX * this.speed);
    this.positionY = this.positionY + (distY * this.speed);
  
    const translateCloudsX = (this.positionX / this.forClouds);
    const translateCloudsY = (this.positionY / this.forClouds);
  
    const translateGroundX = (this.positionX / this.forGround);
    const translateGroundY = (this.positionY / this.forGround);
  
    nativeClouds.style.cssText = `transform: translate(${translateCloudsX}%, ${translateCloudsY}%)`;
    nativeGround.style.cssText = `transform: translate(${translateGroundX}%, ${translateGroundY}%)`;
  
    requestAnimationFrame(() => {
      this.setMouseParallaxStyle();
    });
  }
  
  
  

  onMouseMove(event: MouseEvent) {
    const nativeParallax = this.parallax.nativeElement

    const parallaxWidth = nativeParallax.offsetWidth;
    const parallaxHeight = nativeParallax.offsetHeight;

    const coordX = event.pageX - parallaxWidth / 2;
    const coordY = event.pageY - parallaxHeight / 2;
    
    this.coordPercentX = coordX / parallaxWidth * 100;
    this.coordPercentY = coordY / parallaxHeight * 100;
  }
}
