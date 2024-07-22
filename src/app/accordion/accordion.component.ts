import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css'
})
export class AccordionComponent {
  activeIndex: number = 0;

  setActive(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }

}
