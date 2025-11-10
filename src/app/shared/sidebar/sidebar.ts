import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styles: [`
    :host {
      display: block;
      background-color: black;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {}
