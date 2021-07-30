import { Component, ElementRef, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: [
  ]
})
export class SearcherComponent  {

  @ViewChild('textSearch') textSearch!: ElementRef<HTMLInputElement>;

  constructor (private gifsService: GifsService) { }

  search() {
    const wordValue = this.textSearch.nativeElement.value;

    if (wordValue.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(wordValue);

    this.textSearch.nativeElement.value = "";

  }
}
