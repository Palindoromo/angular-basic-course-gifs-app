import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '8eLvyLVGQHGbLpEua3Un6wGKT3VvXkyW';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor (private http: HttpClient) { 

    this._history = JSON.parse(localStorage.getItem('history')!) || []; // Same as code below

    // if (localStorage.getItem('history')) {
    //   this._history = JSON.parse(localStorage.getItem('history')!); // To keep the lasts searches made before refreshing the page
    // }

    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  buscarGifs (query: string = '') {

    query = query.trim().toLocaleLowerCase(); // To avoid CAPS sensitivity

    if(!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0,10); // To keep a max of 10 results on the sidebar

      localStorage.setItem('history', JSON.stringify(this._history) ); // To keep data on the Local Storage of the browser
    }

    const params = new HttpParams()
        .set("api_key", this.apiKey)
        .set("limit", "10")
        .set("q", query);

    this.http.get<SearchGifsResponse>(`${this.urlService}/search`, { params })
      .subscribe((resp) => {
        
        this.results = resp.data;

        localStorage.setItem('results', JSON.stringify(this.results));
      });
    
    
  }
}
