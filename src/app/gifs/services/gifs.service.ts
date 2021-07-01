import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Gif, SearchGifsResponse } from "../interface/gifs.interface";

@Injectable({
    providedIn: 'root'
})
export class GifsService {
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
        
        this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=d8bdng68u8wSAoKYQBLG2thkR6sEmaD5&q=${query}&limit=10`)
        .subscribe(response => {
            this.resultados = response.data;

            localStorage.setItem('resultados', JSON.stringify(response.data));
        });
    }
}