import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profissional } from '../../../domain/profissional';
import { ProgressService } from '../../template/progress/progress.service';
import { ProfissionalListarComponent } from '../profissional-listar/profissional-listar.component';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-profissional-deletar-dialog',
  templateUrl: './profissional-deletar-dialog.component.html',
  styleUrls: ['./profissional-deletar-dialog.component.css']
})
export class ProfissionalDeletarDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfissionalListarComponent>,
    private productService: ProfissionalService,
    @Inject(MAT_DIALOG_DATA) public data: Profissional,
    private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  confirmDelete() {
    this.progressService.progress.show = true;
    this.productService.remover(this.data.id).subscribe(() => {
      this.progressService.progress.show = false;
      this.productService.exibirMensagem('Deletado com sucesso');
      this.dialogRef.close();
    }, err => {
      this.productService.exibirMensagem('Falha ao deletar profissional', true);
      this.progressService.progress.show = false;
    });
  }
}

