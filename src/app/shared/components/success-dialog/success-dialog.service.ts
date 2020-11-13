import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuccessDialogService {
  private origemMensagem = new Subject<string>();
  mensagemAtual$ = this.origemMensagem.asObservable();

  private origemOcultarDialog = new Subject();
  ocultarDialogAtual$ = this.origemOcultarDialog.asObservable();

  constructor() { }

  mostrarMensagemSucesso(mensagemErro: string) {
    this.origemMensagem.next(mensagemErro);
  }

  ocultarMensagemSucesso() {
    this.origemOcultarDialog.next();
  }
}
