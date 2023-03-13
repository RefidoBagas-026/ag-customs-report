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

    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 4
        }
    };
     

    search(){
        this.error = {};

        if (!this.dateTo || this.dateTo == "Invalid Date")
            this.error.dateTo = "Tanggal Akhir harus diisi";

        if (!this.dateFrom || this.dateFrom == "Invalid Date")
            this.error.dateFrom = "Tanggal Awal harus diisi";


        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.info.page = 1;
            this.info.total=0;
            this.searching();
        }
    }

    searching() {
     
    var args = {
            page: this.info.page,
            size: this.info.size,
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.search(args)
     
            .then(result => {
               this.info.total=result.info.total;    

               var index=0;
               this.data=[];
               this.beginQtyTotal = 0;
               this.receiptQtyTotal = 0;
               this.expendQtyTotal = 0;
               this.lastQtyTotal = 0;
               for (var i of result.data){
                   
                this.beginQtyTotal += i.SaldoAwal;
                this.receiptQtyTotal += i.Pemasukan;
                this.expendQtyTotal += i.Pengeluaran;
                this.lastQtyTotal += i.Selisih;
               
                i.SaldoAwal = i.SaldoAwal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                i.Pemasukan = i.Pemasukan.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                i.Pengeluaran = i.Pengeluaran.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                i.Selisih = i.Selisih.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
 
 
                this.data.push(i);
            }
 
            this.beginQtyTotal = this.beginQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.receiptQtyTotal = this.receiptQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            this.expendQtyTotal = this.expendQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            this.lastQtyTotal = this.lastQtyTotal.toLocaleString('en-EN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) 
               
            });
            
    }

    changePage(e) {
        var page = e.detail;
        this.info.page = page;
        this.searching();
    }
      reset() {
        this.type = "";
        this.dateFrom = "";
        this.dateTo = "";
        
        this.info.page = 1;
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