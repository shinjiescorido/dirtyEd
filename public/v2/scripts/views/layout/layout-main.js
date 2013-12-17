define([
	'backbone',
	'hbs!tmpl/layout/layout-main_tmpl'
],
function( Backbone, LayoutMainTmpl  ) {
    'use strict';

	/* Return a Layout class definition */
	return Backbone.Marionette.Layout.extend({

		initialize: function() {
			console.log("initialize a LayoutMain Layout");
		},
		
    	template: LayoutMainTmpl,
    	

    	/* Layout sub regions */
    	regions: {
    		'contentx':'#content' 
    	},

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
