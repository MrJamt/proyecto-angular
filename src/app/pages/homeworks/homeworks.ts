import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-homeworks',
  imports: [RouterOutlet],
  templateUrl: './homeworks.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Homeworks {
 
}
