(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/main'
		],
		function( Main ) {

			describe('Main Controller', function () {

				it('should be an instance of Main Controller', function () {
					var main = new Main();
					expect( main ).to.be.an.instanceof( Main );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );