(function() {
	'use strict';

	var root = this;

	root.define([
		'views/layout/layout-main'
		],
		function( LayoutMain ) {

			describe('LayoutMain Layout', function () {

				it('should be an instance of LayoutMain Layout', function () {
					var layout-main = new LayoutMain();
					expect( layout-main ).to.be.an.instanceof( LayoutMain );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );