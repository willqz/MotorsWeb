import { VersionModel } from './../interfaces/VersionModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Make } from '../interfaces/Make';
import { Model } from '../interfaces/Model';


@Injectable({
  providedIn: 'root'
})
export class WebmotorsService {

  constructor(private http: HttpClient) { }

  getMakes(): Observable<Make[]> {

   const urlApi  = 'http://desafioonline.webmotors.com.br/api/OnlineChallenge/Make';
    return this.http.get<Make[]>(urlApi).pipe();
  }

  getModels(MakeId: number): Observable<Model[]> {
    const urlApi  = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Model?MakeID=${MakeId}`;
    return this.http.get<Model[]>(urlApi).pipe();
  }

  getVersion(ModelId: number): Observable<VersionModel[]> {
    const urlApi  = `http://desafioonline.webmotors.com.br/api/OnlineChallenge/Version?ModelID=${ModelId}`;
    return this.http.get<VersionModel[]>(urlApi).pipe();
  }

}
