define([
        'backbone',
        'communicator',
        //'hbs!tmpl/welcome',
        'views/layout/layout-main',
        'views/sample'
    ],

    function(Backbone, Communicator, Welcome_tmpl, samp) {
        'use strict';

        var welcomeTmpl = Welcome_tmpl;

        var App = new Backbone.Marionette.Application();

        App.addRegions({});

        App.addInitializer(function() {
            var layout = new Welcome_tmpl();

            //Render that layout
            layout.render();

            //Make the model
            // var simpleModel = new APP.Models.simpleModel({
            //     "field1": "foo",
            //     "field2": "bar"
            // });


            //layout.contentx.show(new samp(//{
                //model: simpleModel
            //}
            //));

        layout.contentx.show(new samp());

        //console.log(layout.el)

            $('body').html(layout.el);
            Communicator.mediator.trigger("APP:START");
        });

        return App;
    });