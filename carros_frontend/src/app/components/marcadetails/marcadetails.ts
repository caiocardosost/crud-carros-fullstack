import { Component, inject, signal } from '@angular/core';
import { Marca } from '../../models/marca';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarcaService } from '../../services/marca-service';
import Swal from 'sweetalert2';

@Component({
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-marcadetails',
  styleUrl: './marcadetails.scss',
  templateUrl: './marcadetails.html',
})
export class Marcadetails {
  marca = signal<Marca>(new Marca(0,""));

  router = inject(ActivatedRoute); // recuperar pathvariable
  router2 = inject(Router); //redirecionar
  marcaServ = inject(MarcaService);

  constructor(){
    let index = this.router.snapshot.params['id'];
      if (index>0){
        this.findById(index);
      }
  }

  save(){
    let index = this.router.snapshot.params['id'];
    if (index>0){
      this.marcaServ.update(this.marca(), index).subscribe({
        next: mensagem =>{
          Swal.fire({
          title: 'Marca atualizada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
          }),
          this.router2.navigate(['admin/marca']);
        },
        error: erro =>{
          alert("Erro ao atualizar");
          console.error(erro);
        }
      })
    } 
    else{     
      this.marcaServ.save(this.marca()).subscribe({
        next: mensagem => {
          Swal.fire({
          title: mensagem,
          icon: 'success',
          confirmButtonText: 'Ok'
          }),
          this.router2.navigate(["admin/marca"]);
        },
        error: erro =>{
          alert("erro ao salvar"),
          console.error(erro);
        }
      })
    }
  }

  findById(index:number){
    this.marcaServ.findById(index).subscribe({
      next: marca => {
        console.log('RESPOSTA DA API:', marca);
        this.marca.set(marca);
      },
      error: erro =>{
        alert("Id invalido!");
          console.error(erro);
      } 
    })
  }
}
