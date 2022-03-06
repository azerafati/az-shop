import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/service/product.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, iif, Observable, startWith, switchMap, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../core/model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchControl = new FormControl(this.activatedRoute.snapshot.queryParamMap.get('search'));

  isLoading = true;
  products$: Observable<Product[]> = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(400),
    distinctUntilChanged(),
    tap(query => {
        this.router.navigate([], {replaceUrl: true, queryParams: {search: query || null}});
        this.isLoading = true;
      }
    ),
    switchMap(
      query => iif(() => !!query, this.productService.searchProducts(query), this.productService.getRecommendedProducts())
    ),
    tap(() => this.isLoading = false)
  );

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }
}
