import { Component, Input } from '@angular/core';
import { Article } from '../shared/data.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent{

  @Input() news:Article;

}
