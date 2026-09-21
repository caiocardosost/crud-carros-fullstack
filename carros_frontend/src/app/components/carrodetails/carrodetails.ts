import { Component, inject, signal } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Carro } from '../../models/carro';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarroService } from '../../services/carro-service';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca-service';
import { Acessorio } from '../../models/acessorio';
import { AcessorioService } from '../../services/acessorio-service';

@Component({
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-carrodetails',
  styleUrl: './carrodetails.scss',
  templateUrl: './carrodetails.html',
})
export class Carrodetails {
  marcas = signal<Marca[]>([]);
  carro = signal<Carro>(new Carro(0,new Marca(0,""),"","",0,0));
  acessorio: Acessorio = new Acessorio(0,"");
  acessoriosList =  signal<Acessorio[]>([]);
  acessoriosCarro = signal<Acessorio[]>([]);
  
  router = inject(ActivatedRoute); // recuperar pathvariable
  router2 = inject(Router); //redirecionar
  carServ = inject(CarroService);
  marcaServ = inject(MarcaService);
  acessorioServ = inject(AcessorioService);


  constructor(){
    let index = this.router.snapshot.params['id'];
      if (index>0){
        this.findById(index);
      }
    this.buscaMarcas();
    this.buscaAcessorios();
  }

  save(){
    let index = this.router.snapshot.params['id'];
    this.carro().acessorio = this.acessoriosCarro();
    if (index>0){
      this.carro().acessorio = this.acessoriosCarro();
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
        this.buscaAcessoriosCarro();
      },
      error: erro =>{
        alert("Id invalido!");
          console.error(erro);
      } 
    })
  }

  buscaMarcas(){
    this.marcaServ.findAll().subscribe({
      next: marcas => {
        console.log('RESPOSTA DA API:', marcas);
        this.marcas.set(marcas);
      },
      error: erro =>{
        alert("Id invalido!");
          console.error(erro);
      } 
    })
  }

  buscaAcessorios(){
    this.acessorioServ.findAll().subscribe({
      next: acessorios => {
        console.log('RESPOSTA DA API:', acessorios);
        this.acessoriosList.set(acessorios);
      },
      error: erro =>{
        alert("Id invalido!");
          console.error(erro);
      } 
    })
  }

  buscaAcessoriosCarro(){
    this.acessoriosCarro.set(this.carro().acessorio);
  }

  inserir(){
    this.acessoriosCarro().push(this.acessorio);
  }
  
  deletar(index:number){
    this.acessoriosCarro().splice(index,1);
  } 

}
