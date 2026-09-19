import { Marca } from "./marca";

export class Carro {
    id!: number;
    marca!: Marca;
    modelo!: string;
    cor!: string;
    ano!: number;
    preco!: number;

    constructor(id: number, marca: Marca, modelo: string, cor: string, ano: number, preco: number){
        this.id = id;
        this.marca = marca;
        this.modelo = modelo;
        this.cor = cor;
        this.ano = ano;
        this.preco = preco;
    }
}
