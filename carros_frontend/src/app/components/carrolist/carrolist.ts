import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarroService } from '../../services/carro-service';
import { Carro } from '../../models/carro';
import Swal from 'sweetalert2';

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

  deletar(index:number){
    this.carServ.delete(index).subscribe({
      next: mensagem =>{
        Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok'
        }),
        this.findAll();
      },
      error: erro => {
        alert("Erro ao deletar");
        console.error(erro);
      }
    })

  }
}
