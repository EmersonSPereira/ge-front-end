import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfissionalCadastrarComponent } from './components/profissional/profissional-cadastrar/profissional-cadastrar.component';
import { ProfissionalListarComponent } from './components/profissional/profissional-listar/profissional-listar.component';
import { ProfissionalAtualizarComponent } from './components/profissional/profissional-atualizar/profissional-atualizar.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { HeaderComponent } from './components/template/header/header.component';
import { NavComponent } from './components/template/nav/nav.component';
import { RedDirective } from './directives/red.directive';
import { HomeComponent } from './view/home/home.component';
import { ProfissionalCrudComponent } from './view/profissional-crud/profissional-crud.component';
import { ProgressComponent } from './components/template/progress/progress.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { EstabelecimentoListarComponent } from './components/estabelecimento/estabelecimento-listar/estabelecimento-listar.component';
import { EstabelecimentoCrudComponent } from './view/estabelecimento-crud/estabelecimento-crud.component';
import { EstabelecimentoCadastrarComponent } from './components/estabelecimento/estabelecimento-cadastrar/estabelecimento-cadastrar.component';
import { EstabelecimentoAtualizarComponent } from './components/estabelecimento/estabelecimento-atualizar/estabelecimento-atualizar.component';
import { DeletarDialogComponent } from './components/deletar-dialog/deletar-dialog.component';
import { ProfissionalAssociarComponent } from './components/profissional/profissional-associar/profissional-associar.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false,
};
registerLocaleData(localePt);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    ProfissionalCrudComponent,
    RedDirective,
    ProfissionalCadastrarComponent,
    ProfissionalListarComponent,
    ProfissionalAtualizarComponent,
    DeletarDialogComponent,
    ProgressComponent,
    EstabelecimentoListarComponent,
    EstabelecimentoCrudComponent,
    EstabelecimentoCadastrarComponent,
    EstabelecimentoAtualizarComponent,
    ProfissionalAssociarComponent,
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatAutocompleteModule,
    NgxMaskModule.forRoot()
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
