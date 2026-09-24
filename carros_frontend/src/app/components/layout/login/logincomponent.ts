import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login-service';
import { Token } from '@angular/compiler';



@Component({
  imports: [MdbFormsModule, FormsModule],
  selector: 'app-login',
  styleUrl: './logincomponent.scss',
  templateUrl: './logincomponent.html',
})
export class LoginComponent {
  login: Login = new Login();

  //injetando dependencia
  router = inject(Router);
  loginserv = inject(LoginService);

  constructor(){
    this.loginserv.removerToken();
  }

  logar() {

    this.loginserv.logar(this.login).subscribe({

        next: token => {

            console.log("Resposta da API:", token);

            this.loginserv.addToken(token);
            this.router.navigate(["admin/carro"]);
        },

        error: erro => {

          console.log("ERRO COMPLETO:", erro);
          console.log("STATUS:", erro.status);
          console.log("STATUS TEXT:", erro.statusText);
          console.log("ERROR:", erro.error);

          if (erro.status === 401) {

              Swal.fire({
                  title: 'Usuário ou senha inválidos!',
                  icon: 'error',
                  confirmButtonText: 'Tentar novamente'
              });

          } else {

              alert("Erro ao realizar a requisição!");

          }
        }
    });
  }
}
