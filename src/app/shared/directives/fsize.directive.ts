import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appFsize]'
})
export class FsizeDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.setFontSize('20px');
  }

  private setFontSize(size: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', size);
  }
}
