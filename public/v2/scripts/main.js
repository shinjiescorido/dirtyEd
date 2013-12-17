require([
        'backbone',
        'application',
        'regionManager',
        'routers/main'
    ],
    function(Backbone, App, router) {
        'use strict';

        App.Router = router;

        App.start();

        if (Backbone.history) {
            Backbone.history.start();
        }
    });