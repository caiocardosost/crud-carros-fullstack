import { Component, inject } from '@angular/core';
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
  carro: Carro = new Carro(0,"",0);

  router = inject(ActivatedRoute); // recuperar pathvariable
  router2 = inject(Router); //redirecionar
  carServ = inject(CarroService);

  save(){
    let index = this.router.snapshot.params['id'];
    if (index>0){
      Swal.fire({
        title: 'Carro atualizado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
      this.carServ.update(this.carro, index);
    } else{
      
      this.carServ.save(this.carro).subscribe({
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


  

  
}
