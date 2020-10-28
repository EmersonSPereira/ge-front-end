import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './view/home/home.component';
import { ProductCrudComponent } from './view/profissional-crud/profissional-crud.component';
import { ProfissionalCadastrarComponent } from './components/profissional/profissional-cadastrar/profissional-cadastrar.component';
import { ProfissionalAtualizarComponent } from './components/profissional/profissional-atualizar/profissional-atualizar.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'profissionais',
  component: ProductCrudComponent
},
{
  path: 'profissionais/cadastrar',
  component: ProfissionalCadastrarComponent
},
{
  path: 'profissionais/atualizar/:id',
  component: ProfissionalAtualizarComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
