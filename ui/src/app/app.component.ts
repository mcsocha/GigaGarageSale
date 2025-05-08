import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { GigaHttpClient } from './shared/giga-http-client';
import { IProduct } from '../../../shared/i-product';
import { ShopComponent } from './shop/shop.component';


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
export class AppComponent implements OnInit {
  title = 'GigaGarageSale';
  txtSearch = new FormControl('');
  options: IProduct[] = [];
  filteredOptions: Observable<IProduct[]>;
  gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);
  router: Router = inject(Router);

  public navigateProduct(id: number) {
    this.router.navigate(['/product', id]);
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

  ngOnInit(): void {
    this.gigaHttpClient.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.options = products;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    })

    this.filteredOptions = this.txtSearch.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.router.events.subscribe({
      next: (params: Params) => {
        this.txtSearch.setValue('');
      }
    });
  }
}
