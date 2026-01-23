import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
  isMenuOpen = false;
}
