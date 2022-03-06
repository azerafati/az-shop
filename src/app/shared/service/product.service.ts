import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../../core/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseApiUrl = environment.baseApiUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getRecommendedProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseApiUrl + '/recommendeds');
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.baseApiUrl + '/products', {
      params: {
        q: query,
        _page: 1,
        _limit: 30
      }
    });
  }
}
