require.config({

    

    /* starting point for application */
    deps: ['backbone.marionette', 'bootstrap', 'main'],


    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },

    paths: {
        jquery: '../Y/jquery/jquery',
        backbone: '../Y/backbone-amd/backbone',
        underscore: '../Y/underscore-amd/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../Y/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../Y/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../Y/backbone.babysitter/lib/amd/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: 'vendor/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../Y/requirejs-text/text',
        tmpl: "../templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../Y/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../Y/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../Y/require-handlebars-plugin/hbs/json2',
        hbs: '../Y/require-handlebars-plugin/hbs'
    },

    hbs: {
        disableI18n: true
    }
});
