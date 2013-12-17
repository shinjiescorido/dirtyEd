define([
        'backbone',
        'communicator',
        'views/layout/layout-main'
    ],

    function(Backbone, Communicator, Welcome_tmpl) {
        'use strict';

        var welcomeTmpl = Welcome_tmpl;

        var App = new Backbone.Marionette.Application();
        App.layoutObj = new Welcome_tmpl().render();

        App.addInitializer(function() {
            $('body #content').html(this.layoutObj.el);
            Communicator.mediator.trigger("APP:START");
        });

        return App;
    });