import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { HeaderService } from '../../template/header/header.service';
import { startWith, map, debounceTime, switchMap } from 'rxjs/operators';
import { DominioFixo as DominioFixo } from '../../../domain/dominio-fixo';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-profissional-associar',
  templateUrl: './profissional-associar.component.html',
  styleUrls: ['./profissional-associar.component.css']
})
export class ProfissionalAssociarComponent implements OnInit {

  constructor(private headerService: HeaderService, private profissionalService: ProfissionalService) {
    headerService.headerData = {
      title: 'Associar profissionais',
      icon: 'compare_arrows',
      routerUrl: '/profissionais/associar'
    };
  }


  myControl = new FormControl();
  filteredOptions: Observable<DominioFixo[]>;

  dominiofixo = new DominioFixo();
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        switchMap(name => name ? this.profissionalService.buscarPorNome(name) : [])
      );
  }

  displayFn(dominiofixo: DominioFixo): string {
    return dominiofixo && dominiofixo.descricao ? dominiofixo.descricao : '';
  }

}
