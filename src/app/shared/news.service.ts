import { Injectable } from '@angular/core';
import { Article } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private _allNews:Article[];
  private _filteredNews:Article[];
  
  get allNews(){
    return this._allNews;
  }
  
  set allNews(news:Article[]){
    this._allNews=news;
  }
    
  get filteredNews(){
    return this._filteredNews;
  }
  
  set filteredNews(news:Article[]){
    this._filteredNews=news;
  }
  
}
