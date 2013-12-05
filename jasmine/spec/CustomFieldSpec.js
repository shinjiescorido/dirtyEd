describe('Custom Field View (custfield.js) spec', function () {
    var view, model;

    beforeEach(function () {
        view = new directory.cfListItemView();
    });

    describe('when view is constructing', function () {

        it ('should exist', function () {
            expect(view).toBeDefined();
        });

       	it ('should have render', function () {
    	
       		expect(view.render).toBeDefined();
   		});

   		it ('should have edit function', function () {
    	
       		expect(view.custEditer).toBeDefined();
   		});

   		it ('should have cancel function', function () {
    	
       		expect(view.custCanceller).toBeDefined();
   		});

   		it ('should have save function', function () {
    	
       		expect(view.custSaver).toBeDefined();
   		});

    });


   describe('Edit Button Click', function () {

    beforeEach(function () {
        view.$el.find('#custEditer').trigger('click');
       
    });


    it('shoul have var value defined', function () {
        expect(view.$el.find('#custEditer').closest("td").prev()).toBeDefined();

    });
});

});




