import { inject } from 'aurelia-framework';
import { Service } from "./service";
import { Router } from 'aurelia-router';
import moment from 'moment';

@inject(Router, Service)
export class List {
  constructor(router, service) {
    this.service = service;
    this.router = router;
  }

  tv1() {
    // window.open("http://175.106.17.18:8009/ptag/");
    window.open("http://103.182.202.42:9002/doc/page/login.asp");
  }



}