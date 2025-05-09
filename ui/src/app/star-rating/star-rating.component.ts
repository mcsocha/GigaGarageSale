import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { IProduct } from '../../../../shared/i-product';

@Component({
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent implements OnInit {

  @ViewChild('stars') starsElem: ElementRef;
  renderer: Renderer2 = inject(Renderer2);


  ngOnInit(): void {
    this.buildStars();


  }

  starsBuilt: boolean = false;

  _product: IProduct = {} as IProduct;
  get product(): IProduct {
    return this._product;
  }
  @Input()
  set product(value: IProduct) {
    this._product = value;
    this.buildStars();
  }

  buildStars(): void {

    let starsSection = this.starsElem?.nativeElement as HTMLElement;
    if (this.product && starsSection) {
      starsSection.innerHTML = ''; // Clear existing stars
      for (let i = 0; i < this.product.rating; i++) {
        let star = this.renderer.createElement('img');
        star.src = '/assets/gold-star.png';
        star.alt = 'Gold star';
        star.className = 'star';
        starsSection.appendChild(star);
      }

      for (let i = 5; i > this.product.rating; i--) {
        let star = this.renderer.createElement('img');
        star.src = '/assets/empty-star.png';
        star.alt = 'Empty star';
        star.className = 'star';
        starsSection.appendChild(star);
      }
      console.log(`Stars built for product ${this.product.id}`);
    }
  }
}
