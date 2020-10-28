import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgressService } from '../../template/progress/progress.service';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-profissional-cadastrar',
  templateUrl: './profissional-cadastrar.component.html',
  styleUrls: ['./profissional-cadastrar.component.css']
})
export class ProfissionalCadastrarComponent implements OnInit {

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
        numeroTelefoneCelular: [null, Validators.compose([Validators.required])],
      }),
  });
  constructor(
    private productService: ProfissionalService,
    private router: Router, private fb: FormBuilder,
    private progressService: ProgressService) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.router.navigate(['/profissionais']);
  }

  createProduct(): void {
    this.progressService.progress.show = true;
    if (this.form.valid) {
      this.productService.cadastrar(this.form.value).subscribe(
        () => {
          this.progressService.progress.show = false;
          this.productService.exibirMensagem('Sucesso ao cadastrar profissional');
          this.router.navigate(['/profissionais']);
        }, err => {
          this.progressService.progress.show = false;
          this.productService.exibirMensagem('Falha ao cadastrar profissional', true);
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
