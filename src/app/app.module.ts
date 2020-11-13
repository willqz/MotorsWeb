import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { ListaanuncioComponent } from './listaanuncio/listaanuncio.component';
import { WebmotorsService } from 'src/app/_services/webmotors.service';
import { AppRoutingModule } from './app-routing.module';
import { SuccessDialogComponent } from './shared/components/success-dialog/success-dialog.component';
import { Globals } from './shared/global';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SuccessDialogComponent,
    AnuncioComponent,
    ListaanuncioComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    // tslint:disable-next-line: deprecation
    NgbModule.forRoot(),
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  entryComponents: [SuccessDialogComponent],
  providers: [
    Globals,
    WebmotorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
