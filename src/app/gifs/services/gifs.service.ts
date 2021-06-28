import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class GifsService {
    private apiKey: string = 'd8bdng68u8wSAoKYQBLG2thkR6sEmaD5';
    private _historial: string[] = [];
    get historial() {
        return [...this._historial];
    }
    public resultados: any[] = [];

    constructor(private http: HttpClient) {}

    buscarGifs (query: string = '') {
        if (query.trim().length === 0) {return;}

        query = query.trim().toLocaleLowerCase();

        if (!this._historial.includes(query)) {
            this._historial.unshift(query);
            this._historial = this._historial.splice(0, 10);
        }
        
        this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=d8bdng68u8wSAoKYQBLG2thkR6sEmaD5&q=${query}&limit=10`)
        .subscribe((response: any) => this.resultados = response.data);
    }
}