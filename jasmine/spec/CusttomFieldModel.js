describe('Custom Field Model (model-rest.js) spec', function () {
    var view, model;

    beforeEach(function () {
        model = new directory.CustFieldModel({label:'sample'});
    });

    describe('when view is constructing', function () {

        it ('should exist', function () {
            expect(model).toBeDefined();
        });

        it('should have urlRoot attrbute pointed at http://localhost:3000/custom-fields',function(){
          expect(model.urlRoot).toEqual('http://localhost:3000/custom-fields');
        })

         it('should have initialize function',function(){
          expect(model.initialize).toBeDefined();
        })

    });

});




