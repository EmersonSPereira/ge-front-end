import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '../../template/header/header.service';
import { ProgressService } from '../../template/progress/progress.service';
import { priceValidator } from '../product-validator';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-profissional-atualizar',
  templateUrl: './profissional-atualizar.component.html',
  styleUrls: ['./profissional-atualizar.component.css']
})
export class ProfissionalAtualizarComponent implements OnInit {

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
      numeroTelefoneCelular: [null, Validators.compose([Validators.required])],
    }),
  });
  constructor(
    private productService: ProfissionalService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private progressService: ProgressService,
    private fb: FormBuilder
  ) {
    this.headerService.headerData = {
      title: 'Editar Profissional',
      icon: 'edit',
      routerUrl: `./profissionais/atualizar/${this.route.snapshot.paramMap.get('id')}`
    };
  }

  ngOnInit(): void {
    this.productService.buscarPorId(this.route.snapshot.paramMap.get('id')).subscribe(
      product => {
        this.form.patchValue(product);
      }
    );
  }

  updateProduct(): void {
    this.progressService.progress.show = true;
    if (this.form.valid) {
      this.productService.atualizar(this.form.value).subscribe(
        () => {
          this.progressService.progress.show = false;
          this.router.navigate(['profissionais']);
          this.productService.exibirMensagem('Profissional atualizado com sucesso!');
        }, err => {
          this.productService.exibirMensagem('Falha ao atualizar profissional', true);
          this.progressService.progress.show = false;
        });
    } else {
      this.progressService.progress.show = false;
      this.form.markAllAsTouched();
    }
  }

  cancel(): void {
    this.router.navigate(['profissionais']);
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
