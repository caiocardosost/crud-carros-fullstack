import { Component, inject, signal } from '@angular/core';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca-service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-marcalist',
  styleUrl: './marcalist.scss',
  templateUrl: './marcalist.html',
})
export class Marcalist {
  
  lista = signal<Marca[]>([]);
  marcaServ = inject(MarcaService);
  
  constructor(){
    this.findAll();
  }

  findAll(){
    this.marcaServ.findAll().subscribe({
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
        this.marcaServ.delete(index).subscribe({
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
