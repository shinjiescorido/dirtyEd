define([
        'backbone',
        'application',
        'views/sample',
        'models/modelProfile'
    ],
    function(Backbone, App, samp, mod) {
        'use strict';

        return {
            'sample': function(id) {
                App.layoutObj.contentx.show(new samp({
                    model: new mod(),
                    id: id
                }));
            }
        };

    });