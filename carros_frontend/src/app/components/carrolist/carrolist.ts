import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarroService } from '../../services/carro-service';
import { Carro } from '../../models/carro';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../auth/login-service';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-carrolist',
  styleUrl: './carrolist.scss',
  templateUrl: './carrolist.html',
})
export class Carrolist {
  lista = signal<Carro[]>([]);
  carServ = inject(CarroService);
  
  //Injeção do loginServ para gerenciar autorizações

  loginServ = inject(LoginService);
  
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
