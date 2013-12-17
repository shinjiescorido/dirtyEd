(function() {
	'use strict';

	var root = this;

	root.define([
		'views/sample'
		],
		function( Sample ) {

			describe('Sample View', function () {

				it('should be an instance of Sample View', function () {
					var sample = new Sample();
					expect( sample ).to.be.an.instanceof( Sample );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );