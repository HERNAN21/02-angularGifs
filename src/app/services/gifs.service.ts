import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Gif, SearchGifsResponse} from '../interfaces/interfaceGifs/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public api_Key: string= 'OwK4TGIKcSs7cutUEc3hZl43Hgppb14P';
  public servicioUrl: string= 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  constructor(
    private http: HttpClient,
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
    

    localStorage.setItem('historial', JSON.stringify(this._historial));
    
    const params = new HttpParams()
                  .set('api_key', this.api_Key)
                  .set('limit', '10')
                  .set('q', query);
    

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp: SearchGifsResponse)=>{
      this.resultados=resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })

  }


}
