import { AnuncioComponent } from './anuncio/anuncio.component';
import { ListaanuncioComponent } from './listaanuncio/listaanuncio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: ListaanuncioComponent},
  { path:  'listarAnuncio', component: ListaanuncioComponent },
  { path:  'anuncio', component: AnuncioComponent },
  { path:  'anuncio/:id', component: AnuncioComponent },

  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
