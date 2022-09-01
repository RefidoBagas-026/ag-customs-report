export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Pemasukan Barang Per Dokumen Pabean' }
        ]);
        this.router = router;
    }
}
