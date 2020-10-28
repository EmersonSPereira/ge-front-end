import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Profissional } from 'src/app/domain/profissional';
import { ProfissionalListagem } from '../../../domain/profissional-listagem';
import { ProfissionalDeletarDialogComponent } from '../profissional-deletar-dialog/profissional-deletar-dialog.component';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-profissional-listar',
  templateUrl: './profissional-listar.component.html',
  styleUrls: ['./profissional-listar.component.css']
})
export class ProfissionalListarComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'telefoneFixo', 'telefoneCelular', 'acao'];
  data: ProfissionalListagem[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProfissionalService, public dialog: MatDialog) { }

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
          return this.productService.buscarPaginado(
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

  openDialog(productSelected: Profissional) {
    const dialogRef = this.dialog.open(ProfissionalDeletarDialogComponent, {
      data: productSelected
    });

    dialogRef.afterClosed().subscribe(() => {
      this.buscarProfissionais();
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
