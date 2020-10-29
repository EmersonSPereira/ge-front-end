import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstabelecimentoService } from '../../estabelecimento/estabelecimento.service';
import { ProgressService } from '../../template/progress/progress.service';

@Component({
  selector: 'app-estabelecimento-cadastrar',
  templateUrl: './estabelecimento-cadastrar.component.html',
  styleUrls: ['./estabelecimento-cadastrar.component.css']
})
export class EstabelecimentoCadastrarComponent implements OnInit {

  form = this.fb.group({

    nome: [null, [Validators.required]],
    endereco: this.fb.group({
      numero: [null, Validators.compose([Validators.required])],
      rua: [null, Validators.compose([Validators.required])],
      bairro: [null, Validators.compose([Validators.required])],
      cidade: [null, Validators.compose([Validators.required])],
      estado: [null, Validators.compose([Validators.required])],
      cep: [null, Validators.compose([Validators.required])]
    }),
    telefone: this.fb.group({
      numeroTelefoneFixo: [null, Validators.compose([Validators.required])],
    }),
  });
  constructor(
    private EstabelecimentoService: EstabelecimentoService,
    private router: Router, private fb: FormBuilder,
    private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/estabelecimentos']);
  }

  createProduct(): void {
    this.progressService.progress.show = true;
    if (this.form.valid) {
      this.EstabelecimentoService.cadastrar(this.form.value).subscribe(
        () => {
          this.progressService.progress.show = false;
          this.EstabelecimentoService.exibirMensagem('Sucesso ao cadastrar estabelecimento');
          this.router.navigate(['/estabelecimentos']);
        }, err => {
          this.progressService.progress.show = false;
          this.EstabelecimentoService.exibirMensagem('Falha ao cadastrar estabelecimento', true);
        });
    } else {
      this.progressService.progress.show = false;
      this.form.markAllAsTouched();
    }
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
  get telefones(): FormArray {
    return this.form.get('telefones') as FormArray;
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
