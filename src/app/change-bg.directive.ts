import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() isCorrect: Boolean = false;

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }
  
  @HostListener('click') answer(){

    this.render.setStyle(this.el.nativeElement, 'pointer-events', 'none');
    if(this.isCorrect){
      this.render.setStyle(this.el.nativeElement, 'background', 'green');
      this.render.setStyle(this.el.nativeElement, 'color', '#fff');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid green');
    } else {
      this.render.setStyle(this.el.nativeElement, 'background', 'red');
      this.render.setStyle(this.el.nativeElement, 'color', '#fff');
      this.render.setStyle(this.el.nativeElement, 'border', '2px solid red');
    }
  }
}
