import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarroService } from '../../services/carro-service';
import { Carro } from '../../models/carro';

@Component({
  imports: [RouterLink],
  selector: 'app-carrolist',
  styleUrl: './carrolist.scss',
  templateUrl: './carrolist.html',
})
export class Carrolist {
  lista = signal<Carro[]>([]);
  carServ = inject(CarroService);

  constructor(){
    this.findAll();
    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo!= null){
      carroNovo.id = 55;
      this.lista().push(carroNovo);
    }

    if(carroEditado != null){
      let index = carroEditado.id;
      this.lista()[index] = carroEditado;
    }

  }

  findAll(){
    this.carServ.findAll().subscribe({
      next: lista =>{
        console.log('RESPOSTA DA API:', lista);
        this.lista.set(lista);
      },
      error: erro =>{
        alert('erro na requisição');
        console.error(erro);
      }
    })
  }

  deletar(carro:Carro){

  }
}
