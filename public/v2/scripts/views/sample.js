define([
	'backbone',
	'hbs!tmpl/layout/sample'
],
function(Backbone, tmp){
    'use strict';

	return Backbone.Marionette.ItemView.extend({
		initialize: function() {
			console.log("initialize a Sample View");
			this.model.fetch();
			console.log(this.model)
			console.log(this.id)
		},

		template: tmp
	});
});
