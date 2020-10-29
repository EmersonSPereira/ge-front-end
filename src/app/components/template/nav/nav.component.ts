import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavService } from './nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private navService: NavService, private route: Router ) { }

  ngOnInit(): void {
  }


  get opened(): boolean {
    return this.navService.headerData.opened;
  }
  set opened(opened: boolean) {
    this.navService.headerData.opened = opened;
  }

  navegarCadastro(): void {
    this.opened = false;
    this.route.navigateByUrl('/profissionais');
  }
  navegarEstabelecimentos(): void {
    this.opened = false;
    this.route.navigateByUrl('/estabelecimentos');
  }
  navegarAssociarProfissional(): void {
    this.opened = false;
    this.route.navigateByUrl('/profissionais/associar');
  }
  navegarHome(): void {
    this.opened = false;
    this.route.navigateByUrl('/');
  }

}
