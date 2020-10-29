import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../template/header/header.service';
import { ProgressService } from '../../template/progress/progress.service';
import { EstabelecimentoService } from '../estabelecimento.service';

@Component({
  selector: 'app-estabelecimento-atualizar',
  templateUrl: './estabelecimento-atualizar.component.html',
  styleUrls: ['./estabelecimento-atualizar.component.css']
})
export class EstabelecimentoAtualizarComponent implements OnInit {

  form = this.fb.group({
    id: [null],
    nome: [null, [Validators.required]],
    endereco: this.fb.group({
      id: [null],
      numero: [null, Validators.compose([Validators.required])],
      rua: [null, Validators.compose([Validators.required])],
      bairro: [null, Validators.compose([Validators.required])],
      cidade: [null, Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])],
      cep: [null, Validators.compose([Validators.required])]
    }),
    telefone: this.fb.group({
      id: [null],
      numeroTelefoneFixo: [null, Validators.compose([Validators.required])],
    }),
  });
  constructor(
    private estabelecimentoService: EstabelecimentoService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private progressService: ProgressService,
    private fb: FormBuilder
  ) {
    this.headerService.headerData = {
      title: 'Editar Estabelecimento',
      icon: 'edit',
      routerUrl: `./estabelecimentos/atualizar/${this.route.snapshot.paramMap.get('id')}`
    };
  }

  ngOnInit(): void {
    this.estabelecimentoService.buscarPorId(this.route.snapshot.paramMap.get('id')).subscribe(
      estabelecimento => {
        this.form.patchValue(estabelecimento);
      }
    );
  }

  atualizar(): void {
    this.progressService.progress.show = true;
    if (this.form.valid) {
      this.estabelecimentoService.atualizar(this.form.value).subscribe(
        () => {
          this.progressService.progress.show = false;
          this.router.navigate(['estabelecimentos']);
          this.estabelecimentoService.exibirMensagem('Estabelecimento atualizado com sucesso!');
        }, err => {
          this.estabelecimentoService.exibirMensagem('Falha ao atualizar estabelecimento', true);
          this.progressService.progress.show = false;
        });
    } else {
      this.progressService.progress.show = false;
      this.form.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.router.navigate(['estabelecimentos']);
  }

  get formValue() {
    return this.form.value;
  }
  get nome() {
    return this.form.get('nome');
  }

  get endereco() {
    return this.form.get('endereco');
  }

  get rua() {
    return this.endereco.get('rua');
  }

  get bairro() {
    return this.endereco.get('bairro');
  }

  get numero() {
    return this.endereco.get('numero');
  }

  get estado() {
    return this.endereco.get('estado');
  }

  get cidade() {
    return this.endereco.get('cidade');
  }
  get cep() {
    return this.endereco.get('cep');
  }


}
