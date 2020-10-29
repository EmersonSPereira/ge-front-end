import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profissional } from 'src/app/domain/profissional';
import { EstabelecimentoListarComponent } from '../estabelecimento/estabelecimento-listar/estabelecimento-listar.component';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { ProfissionalListarComponent } from '../profissional/profissional-listar/profissional-listar.component';
import { ProfissionalService } from '../profissional/profissional.service';
import { ProgressService } from '../template/progress/progress.service';

@Component({
  selector: 'app-deletar-dialog',
  templateUrl: './deletar-dialog.component.html',
  styleUrls: ['./deletar-dialog.component.css']
})
export class DeletarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfissionalListarComponent>,
    private profissionalService: ProfissionalService,
    public dialogRefEstabelecimento: MatDialogRef<EstabelecimentoListarComponent>,
    private estabelecimentoService: EstabelecimentoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    this.progressService.progress.show = true;
    this.data.dominio === 'profissional' ?
      this.deletarProfissional() : this.deletarEstabelecimento();
  }

  private deletarProfissional() {
    this.profissionalService.remover(this.data.id).subscribe(() => {
      this.progressService.progress.show = false;
      this.profissionalService.exibirMensagem('Deletado com sucesso');
      this.dialogRef.close();
    }, err => {
      this.profissionalService.exibirMensagem('Falha ao deletar profissional', true);
      this.progressService.progress.show = false;
    });
  }
  private deletarEstabelecimento() {
    this.estabelecimentoService.remover(this.data.id).subscribe(() => {
      this.progressService.progress.show = false;
      this.estabelecimentoService.exibirMensagem('Deletado com sucesso');
      this.dialogRefEstabelecimento.close();
    }, err => {
      this.estabelecimentoService.exibirMensagem('Falha ao deletar profissional', true);
      this.progressService.progress.show = false;
    });
  }
}

