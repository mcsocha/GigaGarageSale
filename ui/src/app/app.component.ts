import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../shared/i-product';
import { ProductsService } from './shared/products-service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GigaGarageSale';
  txtSearch = new FormControl('');
  options: IProduct[] = [];
  filteredOptions: Observable<IProduct[]>;
  router: Router = inject(Router);
  productsSvc: ProductsService = inject(ProductsService);

  constructor() {

    this.productsSvc.products$
      .then((products: IProduct[]) => {
        this.options = products;
      })
      .catch((err: any) => {
        console.error('Could not load products.', err);
      });

    this.filteredOptions = this.txtSearch.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    // Reset search text box when navigating to a new product
    this.router.events.subscribe({
      next: (params: Params) => {
        this.txtSearch.setValue('');
      }
    });
  }

  public navigateProduct(id: number) {
    this.router.navigate(['/product-detail', id]);
  }

  private _filter(value: string): IProduct[] {
    const filterValue = value.toLowerCase();

    let retVal: IProduct[] = [];
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].title.toLowerCase().includes(filterValue)) {
        retVal.push(this.options[i]);
      }
    }

    return retVal;
  }
}
