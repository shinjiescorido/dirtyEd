module.exports = function(app, models) {
	app.get('/custom-fields', listFields);
	app.post('/custom-fields', createField);

	//temp delete to remove test items
    app.delete('/custom-fields/:id', deleteField);

	//curl http://localhost:3000/custom-fields
	function listFields(req, res) {
		var options = {};
		if (req.query.skip) {
			options.skip = req.query.skip;
		}
		if (req.query.limit) {
		   	options.limit = req.query.limit;
		}
		models.CustomFields.find(null, null, options, function (err, docs) {
		    if (err) {
		    	//console.log(err);
		    	res.send(500, err);
		    } else {
		    	res.send(200, docs);
		    	console.log(docs);
		    }
		});
	}

	// curl -d "label=Job Position&fieldType=3&value[0]=Scrum Master&value[1]=Senior Software Engineer&isPublic=1&isRequired=1&isBasic=1&isEditable=1" http://localhost:3000/custom-fields
	function createField(req, res) {
    	models.CustomFields.create(req.body, function (err, doc) {
    		if (err) {
    			console.log(err);
    		} else {
    			res.send(200, doc);
    			console.log('Added to db');
    		}
    	});

    }

    //curl -X DELETE 'http://localhost:3000/custom-fields/5296ac83b5a2a80336000001'
    function deleteField (req, res) {
    	var id = req.params.id;
    	models.CustomFields.findByIdAndRemove(id, function (err, doc) {
		    if (err) {
		      console.log(err);
		      res.send(404, err);
		    } else {
		      res.send(200, doc);
		    }
		})
    }
	
}



