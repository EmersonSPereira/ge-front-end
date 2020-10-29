import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-estabelecimento-crud',
  templateUrl: './estabelecimento-crud.component.html',
  styleUrls: ['./estabelecimento-crud.component.css']
})
export class EstabelecimentoCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de estabelecimentos',
      icon: 'work',
      routerUrl: '/estabelecimentos'
    };
  }

  ngOnInit(): void {
  }

  public navegarCadastroEstabelecimento(): void {
    this.router.navigate(['/estabelecimentos/cadastrar']);
  }

}
