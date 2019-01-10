import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './data.model';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private base_URL = 'https://newsapi.org/v2/everything';
  private apiKey = '363d26dd3d664d199ca63adc371e22aa'
  pageSize = 10;

  constructor(private http: HttpClient) { }

  getNews(serachstring, page): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.base_URL}?q=${serachstring}&apiKey=${this.apiKey}&pageSize=${this.pageSize}&page=${page}`)
      .pipe(debounceTime(1000));
  }


}


