import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Gif, SearchGifsResponse } from "../interface/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService {
    private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
    private apiKey: string = 'd8bdng68u8wSAoKYQBLG2thkR6sEmaD5';
    private _historial: string[] = [];
    get historial() {
        return [...this._historial];
    }
    public resultados: Gif[] = [];

    constructor(private http: HttpClient) {
        this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    }

    buscarGifs (query: string = '') {
        if (query.trim().length === 0) {return;}

        query = query.trim().toLocaleLowerCase();

        if (!this._historial.includes(query)) {
            this._historial.unshift(query);
            this._historial = this._historial.splice(0, 10);

            localStorage.setItem('historial', JSON.stringify(this._historial));
        }

        const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);
        
        this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
        .subscribe(response => {
            this.resultados = response.data;

            localStorage.setItem('resultados', JSON.stringify(response.data));
        });
    }
}