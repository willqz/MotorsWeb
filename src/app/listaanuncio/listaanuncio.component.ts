import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Globals } from '../shared/global';

const urlAnuncio = `${environment.baseUrl}${Globals.ANUNCIO}`;

@Component({
  selector: 'app-listaanuncio',
  templateUrl: './listaanuncio.component.html',
  styleUrls: ['./listaanuncio.component.css']
})
export class ListaanuncioComponent implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  page: number;
  pageSize: number;
  collectionSize: number;

  listaAnuncios: [] = [];

  ngOnInit() {
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;
    this.pesquisar();
  }

  get quantidadeLinhaAtual() {
    if (this.collectionSize === 0) {
      return 0;
    }

    if ((this.collectionSize / this.pageSize) > this.page) {
      return this.pageSize * this.page;
    } else {
      return this.collectionSize;
    }
  }

  pesquisar() {
    const url = `${urlAnuncio}ListaTodosAnuncios`;
    this.http.get<any>(url).subscribe(data => {
      this.listaAnuncios = data;
      this.collectionSize = this.listaAnuncios.length;
    });
  }

  excluir(id) {
    const url = `${urlAnuncio}DeletarAnuncio?ID=${id}`;
    this.http.delete<any>(url).subscribe(data => {
      this.pesquisar();
    });
  }

}
