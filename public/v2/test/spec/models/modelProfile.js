(function() {
	'use strict';

	var root = this;

	root.define([
		'models/modelProfile'
		],
		function( Modelprofile ) {

			describe('Modelprofile Model', function () {

				it('should be an instance of Modelprofile Model', function () {
					var modelProfile = new Modelprofile();
					expect( modelProfile ).to.be.an.instanceof( Modelprofile );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );