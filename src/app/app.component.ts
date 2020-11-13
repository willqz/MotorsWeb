import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    '../../node_modules/font-awesome/css/font-awesome.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'ng-motors';

  constructor(private rota: Router) {

  }

  ngOnInit() {

  }
}
