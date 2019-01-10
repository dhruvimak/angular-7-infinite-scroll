import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from './shared/news.service';
import { APIService } from './shared/api.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'
import { Article } from './shared/data.model';
import { BehaviorSubject } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  items: Article[];
  error: boolean;
  search: string;
  timeout=false;

  pageIndex = 1;
  end = false;
  theEnd;
  offset = new BehaviorSubject(null);


  constructor(private api: APIService, private news: NewsService) {
  }

  ngOnInit() {
    this.error = true;
  }


  nextBatch(e, offset) {
    if (this.theEnd) {
      this.end=true;
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end===total && !this.timeout) {
      this.timeout=true;
      this.getBatch();
    }
  }
  
 
  getBatch() {
    this.pageIndex++;
      this.api.getNews(this.search.toLowerCase(), this.pageIndex).subscribe(data => {
        this.news.filteredNews = data['articles'];
        if (this.news.filteredNews === null) {
          this.end = true;
        } else {
          this.items = [...this.news.allNews,...this.news.filteredNews];
          this.news.allNews.push(...this.news.filteredNews);
          console.log(this.items);
        }
        this.timeout=false;
      });
    };
  

  onSerach() {
    if(this.viewport)
    this.viewport.scrollToIndex(0);
    this.news.allNews = null;
    this.news.filteredNews = null;
    this.api.getNews(this.search.toLowerCase(), 1).subscribe(data => {
      if (data['articles'].length!==0) {
        this.news.filteredNews = data['articles'];
        this.news.allNews = data['articles'];
        this.error = false;
        this.items = this.news.allNews;
      }
      else{
        this.error=true;
        this.end = true;
      }
    },
      error => {
        alert(error);
      });
  }
}
