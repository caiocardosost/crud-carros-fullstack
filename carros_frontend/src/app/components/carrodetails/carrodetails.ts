import { Component, inject, signal } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Carro } from '../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import { CarroService } from '../../services/carro-service';

@Component({
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-carrodetails',
  styleUrl: './carrodetails.scss',
  templateUrl: './carrodetails.html',
})
export class Carrodetails {
  carro = signal<Carro>(new Carro(0,"","","",0,0));

  router = inject(ActivatedRoute); // recuperar pathvariable
  router2 = inject(Router); //redirecionar
  carServ = inject(CarroService);

  constructor(){
    let index = this.router.snapshot.params['id'];
      if (index>0){
        this.findById(index);
      }
  }

  save(){
    let index = this.router.snapshot.params['id'];
    if (index>0){
      this.carServ.update(this.carro(), index).subscribe({
        next: mensagem =>{
          Swal.fire({
          title: 'Carro atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
          }),
          this.router2.navigate(['admin/carro']);
        },
        error: erro =>{
          alert("Erro ao atualizar");
          console.error(erro);
        }
      })
    } 
    else{     
      this.carServ.save(this.carro()).subscribe({
        next: mensagem => {
          Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok'
          }),
          this.router2.navigate(["admin/carro"]);
        },
        error: erro =>{
          alert("erro ao salvar"),
          console.error(erro);
        }
      })
    }
  }

  findById(index:number){
    this.carServ.findById(index).subscribe({
      next: carro => {
        console.log('RESPOSTA DA API:', carro);
        this.carro.set(carro);
      },
      error: erro =>{
        alert("Id invalido!");
          console.error(erro);
      } 
    })
  }
 
}
