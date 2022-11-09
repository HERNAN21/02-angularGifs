import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Gif, SearchGifsResponse} from '../interfaces/interfaceGifs/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // private apiKey: string= 'OwK4TGIKcSs7cutUEc3hZl43Hgppb14P';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(
    private http: HttpClient
  ) { 
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!) || [];
  }


  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string =''){
    query = query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
    }
    this._historial = this._historial.splice(0,10);
    // console.log(this._historial);

    localStorage.setItem('historial', JSON.stringify(this._historial));
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=OwK4TGIKcSs7cutUEc3hZl43Hgppb14P&q=${query}&limit=10`)
    .subscribe((resp: SearchGifsResponse)=>{
      this.resultados=resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
      console.log(resp.data);
    })

  }


}
