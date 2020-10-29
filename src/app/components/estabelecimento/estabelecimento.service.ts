import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Estabelecimento } from '../../domain/estabelecimento';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EstabelecimentoListagem } from '../../domain/estabelecimento-listagem ';
import { Page } from '../../domain/page';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {


  baseUrl = '/api/estabelecimentos';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  exibirMensagem(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Fechar', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  cadastrar(profissional: Estabelecimento): Observable<Estabelecimento> {
    return this.http.post<Estabelecimento>(this.baseUrl, profissional).pipe(
      catchError(e => throwError(e))
    );
  }

  buscarPaginado(size: number, page: number): Observable<Page<EstabelecimentoListagem>> {
    let params: HttpParams = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());

    return this.http.get<Page<EstabelecimentoListagem>>(`${this.baseUrl}`, { params });
  }

  buscarPorId(id: string): Observable<Estabelecimento> {
    return this.http.get<Estabelecimento>(`${this.baseUrl}/${id}`).pipe(
      catchError(e => throwError(e))
    );
  }

  atualizar(profissional: Estabelecimento): Observable<Estabelecimento> {
    return this.http.put<Estabelecimento>(`${this.baseUrl}/${profissional.id}`, profissional).pipe(
      catchError(e => throwError(e))
    );
  }

  remover(id: number): Observable<Estabelecimento> {
    return this.http.delete<Estabelecimento>(`${this.baseUrl}/${id}`).pipe(
      catchError(e => throwError(e))
    );
  }
}
