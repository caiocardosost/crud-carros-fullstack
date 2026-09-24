import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login-service';

export const loginGuard: CanActivateFn = (route, state) => {
  //Injeção do login service p/ verificar role
  let loginServ = inject(LoginService);

  if(loginServ.hasRole("USER") && (state.url == "/admin/carro/new" || state.url.startsWith("/admin/carro/edit/"))){
    alert("Voce não tem permissão para acessar este recurso!");
    return false;
  }


  
  return true;
};
