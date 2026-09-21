import { Routes } from '@angular/router';
import { Login } from './components/layout/login/login';
import { Principal } from './components/layout/principal/principal';
import { Carrolist } from './components/carrolist/carrolist';
import { Carrodetails } from './components/carrodetails/carrodetails';
import { Marcalist } from './components/marcalist/marcalist';
import { Marcadetails } from './components/marcadetails/marcadetails';
import { Acessorioslist } from './components/acessorioslist/acessorioslist';
import { Acessoriosdetails } from './components/acessoriosdetails/acessoriosdetails';

export const routes: Routes = [
    {path:"", redirectTo:"login", pathMatch:'full'},
    {path:"login", component: Login},
    {path: "admin", component:Principal,
        children:[
            {path:"carro", component:Carrolist},
            {path:"carro/new", component:Carrodetails},
            {path:"carro/edit/:id", component:Carrodetails},
            {path:"marca", component:Marcalist},
            {path:"marca/new", component:Marcadetails},
            {path:"marca/edit/:id", component:Marcadetails},
            {path:"acessorio", component:Acessorioslist},
            {path:"acessorio/new", component:Acessoriosdetails},
            {path:"acessorio/edit/:id", component:Acessoriosdetails}
        ]
    }
];
