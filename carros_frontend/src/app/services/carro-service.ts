import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Carro } from '../models/carro';

@Injectable({
  providedIn: 'root'
})

export class CarroService {
    http = inject(HttpClient);
    API = "http://localhost:8081/api/carro";

    constructor(){}

    findAll():Observable<Carro[]>{
        return this.http.get<Carro[]>(this.API+"/buscatodos");
    }

    save(carro: Carro): Observable<string>{
        return this.http.post<string>(this.API+"/novo", carro, {responseType: 'text' as 'json'});
    }
    update(carro:Carro, index: number){
        //todo
    }
}
