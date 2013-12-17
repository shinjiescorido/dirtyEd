(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/main'
		],
		function( Main ) {

			describe('Main Router', function () {

				it('should be an instance of Main Router', function () {
					var main = new Main();
					expect( main ).to.be.an.instanceof( Main );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );