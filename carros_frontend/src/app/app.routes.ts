import { Routes } from '@angular/router';
import { Login } from './components/layout/login/login';
import { Principal } from './components/layout/principal/principal';
import { Carrolist } from './components/carrolist/carrolist';
import { Carrodetails } from './components/carrodetails/carrodetails';

export const routes: Routes = [
    {path:"", redirectTo:"login", pathMatch:'full'},
    {path:"login", component: Login},
    {path: "admin", component:Principal,
        children:[
            {path:"carro", component:Carrolist},
            {path:"carro/new", component:Carrodetails},
            {path:"carro/edit/:id", component:Carrodetails}
        ]
    }
];
