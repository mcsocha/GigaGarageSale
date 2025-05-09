import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { fadeOut, fadeIn } from '../shared/fade-animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fade-out-text',
  imports: [CommonModule],
  templateUrl: './fade-out-text.component.html',
  styleUrl: './fade-out-text.component.scss',
  animations: [fadeOut(1500)]
})
export class FadeOutTextComponent implements AfterViewInit {
  
  @Input()
  text: string;

  isVisible: boolean = true;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isVisible = false;
    }, 1500);
  }
}
