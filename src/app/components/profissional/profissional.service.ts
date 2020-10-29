import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Page } from 'src/app/domain/page';
import { Profissional } from '../../domain/profissional';
import { ProfissionalListagem } from '../../domain/profissional-listagem';
import { DominioFixo } from '../../domain/dominio-fixo';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService {


  baseUrl = '/api/profissional';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  exibirMensagem(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'Fechar', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3500,
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  cadastrar(profissional: Profissional): Observable<Profissional> {
    return this.http.post<Profissional>(this.baseUrl, profissional).pipe(
      catchError(e => throwError(e))
    );
  }

  buscarPaginado(size: number, page: number): Observable<Page<ProfissionalListagem>> {
    let params: HttpParams = new HttpParams();
    params = params.append('size', size.toString());
    params = params.append('page', page.toString());

    return this.http.get<Page<ProfissionalListagem>>(`${this.baseUrl}`, { params });
  }

  buscarPorId(id: string): Observable<Profissional> {
    return this.http.get<Profissional>(`${this.baseUrl}/${id}`).pipe(
      catchError(e => throwError(e))
    );
  }

  atualizar(profissional: Profissional): Observable<Profissional> {
    return this.http.put<Profissional>(`${this.baseUrl}/${profissional.id}`, profissional).pipe(
      catchError(e => throwError(e))
    );
  }

  remover(id: number): Observable<Profissional> {
    return this.http.delete<Profissional>(`${this.baseUrl}/${id}`).pipe(
      catchError(e => throwError(e))
    );
  }

  buscarPorNome(nome: string): Observable<DominioFixo[]> {
    return this.http.get<DominioFixo[]>(`${this.baseUrl}/nome/${nome}`).pipe(
      catchError(e => throwError(e))
    );
  }
}
