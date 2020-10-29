import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ProfissionalCrudComponent } from './view/profissional-crud/profissional-crud.component';
import { ProfissionalCadastrarComponent } from './components/profissional/profissional-cadastrar/profissional-cadastrar.component';
import { ProfissionalAtualizarComponent } from './components/profissional/profissional-atualizar/profissional-atualizar.component';
import { EstabelecimentoCrudComponent } from './view/estabelecimento-crud/estabelecimento-crud.component';
import { EstabelecimentoCadastrarComponent } from './components/estabelecimento/estabelecimento-cadastrar/estabelecimento-cadastrar.component';
import { EstabelecimentoAtualizarComponent } from './components/estabelecimento/estabelecimento-atualizar/estabelecimento-atualizar.component';
import { ProfissionalAssociarComponent } from './components/profissional/profissional-associar/profissional-associar.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'profissionais',
  component: ProfissionalCrudComponent
},
{
  path: 'profissionais/cadastrar',
  component: ProfissionalCadastrarComponent
},
{
  path: 'profissionais/associar',
  component: ProfissionalAssociarComponent
},
{
  path: 'profissionais/atualizar/:id',
  component: ProfissionalAtualizarComponent
},
{
  path: 'estabelecimentos',
  component: EstabelecimentoCrudComponent
},
{
  path: 'estabelecimentos/cadastrar',
  component: EstabelecimentoCadastrarComponent
},
{
  path: 'estabelecimentos/atualizar/:id',
  component: EstabelecimentoAtualizarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
