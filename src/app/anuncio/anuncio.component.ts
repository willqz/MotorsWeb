import { VersionModel } from './../interfaces/VersionModel';
import { HttpClient } from '@angular/common/http';
import { Model } from './../interfaces/Model';
import { Component, OnInit, Version } from '@angular/core';
import { Make } from '../interfaces/Make';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WebmotorsService } from 'src/app/_services/webmotors.service';
import { MatDialog } from '@angular/material';
import * as $ from 'jquery';
import { Globals } from '../shared/global';
import { environment } from 'src/environments/environment';
import { SuccessDialogComponent } from '../shared/components/success-dialog/success-dialog.component';
import { parse, stringify } from 'querystring';
import { version } from 'process';

const urlAnuncio = `${environment.baseUrl}${Globals.ANUNCIO}`;

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  id = 0;

  form: FormGroup;

  listModel: Model[] = [];
  listVersion: VersionModel[] = [];
  listMakes: Make[] = [];

  NameMake = '';
  NameModel = '';
  NameVersion = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private WebmotorsService: WebmotorsService,
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.getMake();

    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id');
    });

    this.form = this.fb.group({
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      versao: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      km: ['', [Validators.required]],
      observacao: ['', [Validators.required]]
    });

    if (this.id > 0) {
      this.obterAnuncioId(this.id);
    }

  }

  getVersionModel(ModelID: number) {
    const urlApi  = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${ModelID}`;
    this.http.get<any>(urlApi).subscribe(data => {
      this.listVersion = [];
      data.forEach(item => {
        this.listVersion.push({
          ModelId: item.ModelId, Id : item.ID , Name: item.Name
        });
      });
    });
  }

  getModel(MakeID: number) {
    const urlApi  = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${MakeID}`;
    this.http.get<any>(urlApi).subscribe(data => {
      this.listModel = [];
      data.forEach(item => {
        this.listModel.push({
          MakeId: item.MakeId, Id : item.ID , Name: item.Name
        });
      });
    });
  }

  getMake() {
    const urlApi  = 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make';
    this.http.get<any>(urlApi).subscribe(data => {

      this.listMakes = [];
      this.listModel = [];
      this.listVersion = [];

      data.forEach(item => {
        this.listMakes.push({
          Id : item.ID , Name: item.Name
        });
      });
    });
  }

  setMake(makeName: string, modelName: string, versionName: string) {
    debugger;
    const urlApi  = 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make';
    this.http.get<any>(urlApi).subscribe(data => {

      this.listMakes = [];
      data.forEach(item => {
        this.listMakes.push({
          Id : item.ID , Name: item.Name
        });
      });

      const make =  this.listMakes.find(s => s.Name == makeName);
      this.form.get('marca').setValue(make.Id);
      this. setModel(make.Id, modelName, versionName);
    });
  }

  setModel(makeId: number, modelName: string, versionName: string) {

    const urlApi  = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${makeId}`;
    this.http.get<any>(urlApi).subscribe(data => {
      this.listModel = [];
      data.forEach(item => {
        this.listModel.push({
          MakeId: item.MakeId, Id : item.ID , Name: item.Name
        });
      });

      const model =  this.listModel.find(s => s.Name == modelName);
      const modelId = model.Id;
      this.form.get('modelo').setValue(modelId);

      this.setVersion(modelId, versionName);
    });
  }

  setVersion(modelId: Number, versionName: string) {

    const urlApi  = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${modelId}`;
    this.http.get<any>(urlApi).subscribe(data => {
      this.listVersion = [];
      data.forEach(item => {
        this.listVersion.push({
          ModelId: item.ModelId, Id : item.ID , Name: item.Name
        });
      });

      const version =  this.listVersion.find(s => s.Name == versionName);
      const versionId = version.Id;
      this.form.get('versao').setValue(versionId);
    });

  }

  obterAnuncioId(id: number) {

    const url = `${urlAnuncio}ObterAnuncioPorID?ID=${id}`;
    this.http.get<any>(url).subscribe(data => {

      debugger;
      this.NameMake = data.marca;
      this.NameModel = data.modelo;
      this.NameVersion = data.versao;

      this.setMake(this.NameMake, this.NameModel, this.NameVersion);
      this.form.get('ano').setValue(parseInt(data.ano));
      this.form.get('km').setValue(parseInt(data.quilometragem, 0));
      this.form.get('observacao').setValue(data.observacao);
    });

  }

  get f() {
    return this.form.controls;
  }


  voltar() {
    this.router.navigate(['/listarAnuncio']);
  }

  submit() {

    if (this.id > 0) {
     this.editarAnuncio();
    } else {
      this.salvarAnuncio();
    }
  }

  salvarAnuncio() {

    const anuncio = {
      Id: 0,
      marca: this.NameMake,
      modelo: this.NameModel,
      versao: this.getNameVersion(),
      ano: this.form.get('ano').value,
      quilometragem : this.form.get('km').value,
      observacao: this.form.get('observacao').value
    };

    debugger;
    const url = `${urlAnuncio}CadastrarAnuncio`;
    this.http.post<any>(url, anuncio).subscribe(data => {

      const alertok = this.dialog.open(SuccessDialogComponent, {
        data: 'Cadastro realizado com sucesso'
      });
      alertok.afterClosed().subscribe(() => {
        this.voltar();
      });

    });
  }

  editarAnuncio() {
    const anuncio = {
      Id: this.id,
      marca: this.NameMake,
      modelo: this.NameModel,
      versao: this.getNameVersion(),
      ano: this.form.get('ano').value,
      quilometragem : this.form.get('km').value,
      observacao: this.form.get('observacao').value
    };

    debugger;
    const url = `${urlAnuncio}EditarAnuncio`;
    this.http.put<any>(url, anuncio).subscribe(data => {
      const alertok = this.dialog.open(SuccessDialogComponent, {
        data: 'Cadastro editado com sucesso'
      });
      alertok.afterClosed().subscribe(() => {
        this.voltar();
      });
    }, error => {
      this.erroApi();
    });
  }

  onChangeMake() {
    debugger;
    const MakeId = this.form.get('marca').value;
    const make = this.listMakes.find(s => s.Id == MakeId);
    if (make)
      this.NameMake = make.Name;

    this.getModel(MakeId);
  }

  onChangeModel() {

    const ModelID = this.form.get('modelo').value;
    const model = this.listModel.find(s => s.Id == ModelID);
    if (model)
      this.NameModel = model.Name

    if (ModelID != "0"){
      this.getVersionModel(ModelID);
    }
  }

  getNameVersion() {

    const VersionID = this.form.get('versao').value;
    const version = this.listVersion.find(s => s.Id == VersionID);
    if (version)
      this.NameVersion = version.Name

    return this.NameVersion;
  }

  erroApi() {
    const alertok = this.dialog.open(SuccessDialogComponent, {
      data: 'Ops! Parece que algo deu errado!'
    });
    alertok.afterClosed().subscribe(() => {
      this.voltar();
    });
  }


}
