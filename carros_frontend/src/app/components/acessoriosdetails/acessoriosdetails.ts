import { Component, inject, signal } from '@angular/core';
import { Acessorio } from '../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import { AcessorioService } from '../../services/acessorio-service';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-acessoriosdetails',
  styleUrl: './acessoriosdetails.scss',
  templateUrl: './acessoriosdetails.html',
})
export class Acessoriosdetails {
  acessorio = signal<Acessorio>(new Acessorio(0,""));

  router = inject(ActivatedRoute); // recuperar pathvariable
  router2 = inject(Router); //redirecionar
  acessorioServ = inject(AcessorioService);

  constructor(){
    let index = this.router.snapshot.params['id'];
      if (index>0){
        this.findById(index);
      }
  }

  save(){
    let index = this.router.snapshot.params['id'];
    if (index>0){
      this.acessorioServ.update(this.acessorio(), index).subscribe({
        next: mensagem =>{
          Swal.fire({
          title: 'Marca atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
          }),
          this.router2.navigate(['admin/acessorio']);
        },
        error: erro =>{
          alert("Erro ao atualizar");
          console.error(erro);
        }
      })
    } 
    else{     
      this.acessorioServ.save(this.acessorio()).subscribe({
        next: mensagem => {
          Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok'
          }),
          this.router2.navigate(["admin/acessorio"]);
        },
        error: erro =>{
          alert("erro ao salvar"),
          console.error(erro);
        }
      })
    }
  }

  findById(index:number){
    this.acessorioServ.findById(index).subscribe({
      next: acessorio => {
        console.log('RESPOSTA DA API:', acessorio);
        this.acessorio.set(acessorio);
      },
      error: erro =>{
        alert("Id invalido!");
          console.error(erro);
      } 
    })
  }

}
