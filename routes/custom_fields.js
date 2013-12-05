module.exports = function(app, custom_fields) {

    app.get('/custom-fields', listFields);
    app.post('/custom-fields', createField);
    app.get('/custom-fields/:mode', listCustomFieldsByMode);

    //temp delete to remove test items
    app.delete('/custom-fields/:id', deleteField);
    app.post('/updatecustomfield/:id', function(req, res) {

        var id = req.params.id;
        var cfData = req.body;

        custom_fields.customFieldsModel.update({
            '_id': id
        }, cfData, {
            safe: true
        }, function(err, result) {
            if (err) {
                // console.log('Error updating CustomFields: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(200, cfData);
            }
        });
    });

    //curl http://localhost:3000/custom-fields

    function listFields(req, res) {
        var options = {};
        if (req.query.skip) {
            options.skip = req.query.skip;
        }
        if (req.query.limit) {
            options.limit = req.query.limit;
        }
        custom_fields.customFieldsModel.find(null, null, options, function(err, docs) {
            if (err) {
                //console.log(err);
                res.send(500, err);
            } else {
                res.send(200, docs);
                console.log(docs);
            }
        });
    }

    //curl http://localhost:3000/custom-fields/1

    function listCustomFieldsByMode(req, res) {
        var options = {};
        var moder = req.params.mode == 1;
        if (req.query.skip) {
            options.skip = req.query.skip;
        }
        if (req.query.limit) {
            options.limit = req.query.limit;
        }
        custom_fields.customFieldsModel.find({
            isBasic: moder
        }, null, options, function(err, docs) {
            if (err) {
                //console.log(err);
                res.send(500, err);
            } else {
                res.send(200, docs);
                console.log(docs);
            }
        });
    }

    //curl -d "label=First Name&fieldType=1&value[0]= &isPublic=1&isRequired=1&isBasic=1&isEditable=1" http://localhost:3000/custom-fields

    function createField(req, res) {
        custom_fields.customFieldsModel.create(req.body, function(err, doc) {
            if (err) {
                console.log(err);
                res.send(404, err);
            } else {
                console.log('Added to db');
                custom_fields.customFieldsModel.update({
                    _id: doc.id
                }, {}, function(err, doc) {
                    if (err) {
                        console.log(err);
                        res.send(500, err);
                    } else {
                        console.log('Value pushed to DB');
                        res.send(200, doc);
                    }
                });
            }
        });

    }

    //curl -X DELETE 'http://localhost:3000/custom-fields/5296ac83b5a2a80336000001'

    function deleteField(req, res) {
        var id = req.params.id;
        custom_fields.customFieldsModel.findByIdAndRemove(id, function(err, doc) {
            if (err) {
                console.log(err);
                res.send(404, err);
            } else {
                res.send(200, doc);
            }
        })
    }

    module.exports.listFields = listFields;
}
