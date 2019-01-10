import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { APIService } from './shared/api.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsService } from './shared/news.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [APIService, NewsService, { provide: 'virtualScroller.scrollDebounceTime', useValue: 1000 }],
  bootstrap: [AppComponent]
})
export class AppModule { }
