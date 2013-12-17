define([
        'backbone'
    ],
    function(Backbone) {
        'use strict';

        /* Return a model class definition */
        return Backbone.Model.extend({
            initialize: function() {
                console.log("initialize a Modelprofile model");
            },

            defaults: {},

            idAttribute: "_id",
            
            url: '/custom-fields'

        });
    });