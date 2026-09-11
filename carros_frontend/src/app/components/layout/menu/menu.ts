import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';


@Component({
  imports: [MdbCollapseModule],
  selector: 'app-menu',
  styleUrl: './menu.scss',
  templateUrl: './menu.html',
})
export class Menu {}
