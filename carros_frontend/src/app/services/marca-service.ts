import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca';

@Service()
export class MarcaService {
    http = inject(HttpClient);
    API = "http://localhost:8081/api/marca";

    constructor(){}

    findAll():Observable<Marca[]>{
        return this.http.get<Marca[]>(this.API+"/marcaslist");
    }

    findById(index:number):Observable<Marca>{
        return this.http.get<Marca>(this.API+"/busca/"+index);
    }

    save(marca: Marca): Observable<string>{
        return this.http.post<string>(this.API+"/nova", marca, {responseType: 'text' as 'json'});
    }
    update(marca:Marca, index: number): Observable<string>{
        return this.http.put<string>(this.API+"/editar/"+index, marca, {responseType: 'text' as 'json'});
    }
    delete(index: number): Observable<string>{
        return this.http.delete<string>(this.API+"/apagar/"+index, {responseType: 'text' as 'json'});
    }

}
