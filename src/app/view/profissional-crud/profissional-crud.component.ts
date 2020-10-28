import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

@Component({
  selector: 'app-profissional-crud',
  templateUrl: './profissional-crud.component.html',
  styleUrls: ['./profissional-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de profissionais',
      icon: 'storefront',
      routerUrl: '/profissionais'
    };
  }

  ngOnInit(): void {
  }

  public navigateToProductCreate(): void {
    this.router.navigate(['/profissionais/cadastrar']);
  }
}
