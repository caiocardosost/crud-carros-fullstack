import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from '../menu/menu';

@Component({
  imports: [RouterOutlet, Menu],
  selector: 'app-principal',
  styleUrl: './principal.scss',
  templateUrl: './principal.html',
})
export class Principal {}
