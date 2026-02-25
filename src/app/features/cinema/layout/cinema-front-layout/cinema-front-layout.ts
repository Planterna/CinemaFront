import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from '../../components/front-navbar/front-navbar';

@Component({
  selector: 'app-cinema-front-layout',
  imports: [FrontNavbar, RouterOutlet],
  templateUrl: './cinema-front-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CinemaFrontLayout {}
