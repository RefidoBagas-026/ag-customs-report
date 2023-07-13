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
    info = { page: 1,size:50};
    search(){
        this.info.page = 1;
        this.searching();
    }
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
    
    searching() {
    var args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(args)

            .then(result => {
                this.beginQtyTotal = 0;
                this.receiptQtyTotal = 0;
                this.expendQtyTotal = 0;
                this.lastQtyTotal = 0;
                this.adjustQtyTotal = 0;
                this.diffQtyTotal = 0;
                this.OpnameQtyTotal = 0;
                result.data.forEach(i => {
                    this.beginQtyTotal += i.SaldoAwal;
                    this.receiptQtyTotal += i.Pemasukan;
                    this.expendQtyTotal += i.Pengeluaran;
                    this.lastQtyTotal += i.SaldoAkhir;
                    this.adjustQtyTotal += i.Penyesuaian;
                    this.diffQtyTotal += i.Selisih;
                    this.OpnameQtyTotal += i.StockOpname;

                });
               this.data=result.data;     
               
               this.beginQtyTotal = this.beginQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.receiptQtyTotal = this.receiptQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
               this.expendQtyTotal = this.expendQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
               this.lastQtyTotal = this.lastQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
               this.adjustQtyTotal = this.adjustQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
               this.diffQtyTotal = this.diffQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
               this.OpnameQtyTotal = this.OpnameQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            });
            
    }
    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
      reset() {
      
        this.dateFrom = "";
        this.dateTo = "";
    }

    ExportToExcel() {
        this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            var info = {
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            }
            this.service.generateExcel(info);
        }
    }
}