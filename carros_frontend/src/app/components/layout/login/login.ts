import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  usuario!: string;
  senha!: string;

  //injetando dependencia
  router = inject(Router);

  logar(){
    if(this.usuario == 'admin' && this.senha == 'admin'){
      this.router.navigate(["admin/carro"]);
    }
    else{
      Swal.fire({
      title: 'Usuario ou senha invalidos!',
       icon: 'error',
      confirmButtonText: 'Tentar novamente'
      })
    }
  }
}
