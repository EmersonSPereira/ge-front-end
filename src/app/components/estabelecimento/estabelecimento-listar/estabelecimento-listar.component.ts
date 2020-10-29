import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Estabelecimento } from 'src/app/domain/estabelecimento';
import { EstabelecimentoListagem } from 'src/app/domain/estabelecimento-listagem ';
import { DeletarDialogComponent } from '../../deletar-dialog/deletar-dialog.component';
import { EstabelecimentoService } from '../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-listar',
  templateUrl: './estabelecimento-listar.component.html',
  styleUrls: ['./estabelecimento-listar.component.css']
})
export class EstabelecimentoListarComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'telefoneFixo', 'acao'];
  data: EstabelecimentoListagem[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estabelecimetoService: EstabelecimentoService, public dialog: MatDialog) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.buscarProfissionais();
  }

  private buscarProfissionais() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.estabelecimetoService.buscarPaginado(
            this.paginator.pageSize, this.paginator.pageIndex);
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalElements;

          return data.content;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }

  openDialog(estabelecimentoSelecionado: Estabelecimento) {
    const dialogRef = this.dialog.open(DeletarDialogComponent, {
      data: {
        id: estabelecimentoSelecionado.id,
        nome: estabelecimentoSelecionado.nome,
        dominio: 'estabelecimento'
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.buscarProfissionais();
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
