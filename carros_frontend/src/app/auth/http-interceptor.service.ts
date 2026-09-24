import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {

  let router = inject(Router);

  let token = localStorage.getItem('token');
  
  console.log('entrou aqui 1');
  console.log('URL:', request.url);
  console.log('Método:', request.method);
  console.log('Body:', request.body);
  if (token && !router.url.includes('/login')) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  console.log('antes do next');
  return next(request).pipe(
    tap(response => {
      console.log('resposta passou pelo interceptor:', response);
    }),
    catchError((err: any) => {
      console.log('entrou no catchError');
      if (err instanceof HttpErrorResponse) {
        console.log('entrou aqui 2');
        
        //if (err.status === 401) {
        //  alert('401 - tratar aqui');
        //  router.navigate(['/login']);
        //} else
        if (err.status === 403) {
          alert('403 - tratar aqui');
          router.navigate(['/login']);
        } else {
          console.error('HTTP error:', err);
        }


      } else {
        console.error('An error occurred:', err);
      }

      return throwError(() => err);
    })
  );
};
