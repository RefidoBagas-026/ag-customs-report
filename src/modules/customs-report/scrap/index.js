export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: true, title: 'List: Laporan Penyelesaian Waste / Scrap' }
        ]);
        this.router = router;
    }
}
