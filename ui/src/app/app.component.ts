import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
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
  options: string[];
  filteredOptions: Observable<string[]>;
  gigaHttpClient: GigaHttpClient = inject(GigaHttpClient);

  constructor() {

    this.gigaHttpClient.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.options = products.map(p => p.title);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    })

    this.filteredOptions = this.txtSearch.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
