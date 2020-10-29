import { Telefone } from './telefone';
import { Endereco } from './endereco';
export class Estabelecimento {
    id?: number;
    nome: string;
    endereco: Endereco;
    telefone: Telefone;
}