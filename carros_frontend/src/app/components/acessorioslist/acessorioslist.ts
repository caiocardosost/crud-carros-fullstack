import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Acessorio } from '../../models/acessorio';
import { AcessorioService } from '../../services/acessorio-service';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-acessorioslist',
  styleUrl: './acessorioslist.scss',
  templateUrl: './acessorioslist.html',
})
export class Acessorioslist {
  
  
  lista = signal<Acessorio[]>([]);
  acessorioServ = inject(AcessorioService);
  
  constructor(){
    this.findAll();
  }

  findAll(){
    this.acessorioServ.findAll().subscribe({
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
    //OBS: Swal é apenas uma caixinha de alerta personalizada (perguntando se que apagar o não).
    //A lógica é só as duas linhas do if.
    //posso simplesmente usar um "confirm('texto')" no lugar.
    Swal.fire({
      title: 'Deseja realmente apagar este item?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não"
      }).then((result) => {
      if (result.isConfirmed){
        this.acessorioServ.delete(index).subscribe({
          next: mensagem =>{
            Swal.fire({
              title: mensagem,
              icon: 'success',
              confirmButtonText: 'Ok'
            }),
            this.findAll();
          },
          error: erro => {
            Swal.fire({
              title: "Ocorreu um erro",
              icon: 'error',
              confirmButtonText: 'Ok'
            });
            console.error(erro);
          }
        })
      };
    });
  }

}
