import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Acessorio } from '../models/acessorio';

@Service()
export class AcessorioService {
    http = inject(HttpClient);
    API = "http://localhost:8081/api/acessorio";

    constructor(){}

    findAll():Observable<Acessorio[]>{
        return this.http.get<Acessorio[]>(this.API+"/acessorioslist");
    }

    findById(index:number):Observable<Acessorio>{
        return this.http.get<Acessorio>(this.API+"/busca/"+index);
    }

    save(acessorio: Acessorio): Observable<string>{
        return this.http.post<string>(this.API+"/novo", acessorio, {responseType: 'text' as 'json'});
    }
    update(acessorio:Acessorio, index: number): Observable<string>{
        return this.http.put<string>(this.API+"/editar/"+index, acessorio, {responseType: 'text' as 'json'});
    }
    delete(index: number): Observable<string>{
        return this.http.delete<string>(this.API+"/apagar/"+index, {responseType: 'text' as 'json'});
    }


}
