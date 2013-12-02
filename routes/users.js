module.exports = function(app, user) {

    //app.get('/add-user', listUsers);
    app.get('/directory', listAllUsers);
    // app.post('/add-user', addUser);

    // temporary function to add user
    app.get('/add-user-temp', addusertemp);



    //temp delete to remove test items
    app.delete('/profile/:id', deleteUser);

    app.get('/profile/:username', showProfile)


    var custom_fields = require('../routes/custom_fields');


    function showProfile(req, res) {
        var username = req.params.username;
        var UsernameFieldLabel = "Username";
        var id;
        user.customFieldsModel.findOne({label: UsernameFieldLabel}, function(err, doc) {
            if (err) {
                console.log(err);
                res.send(500, err);
            } else {
                id = doc._id;
                user.Users.find({field: {$elemMatch: {objectID: id, assignedValue: username}}, isActive: 1}, null, function(error, employee) {
                    res.send(200, employee);
                    console.log(username + 'retrieved.');
                });
            }
        });
    }

    function listAllUsers(req, res) {
        var options = {};
        if (req.query.skip) {
            options.skip = req.query.skip;
        }
        if (req.query.limit) {
            options.limit = req.query.limit;
        }
        user.Users.find({ isActive: 1 }, null, options, function (err, docs) {
            if (err) {
                //console.log(err);
                res.send(500, err);
            } else {
                res.send(200, docs);
            }
        });
    }

    function addusertemp(req,res) {
        var employees = {
                "field": [
                            {"objectID": "5297d80a025a83e404000004", "assignedValue": ["Rosana"], "requestedValue":[""] },
                            {"objectID": "5297d80f025a83e404000005", "assignedValue": [" "], "requestedValue":[""] },
                            {"objectID": "5297d815025a83e404000006", "assignedValue": ["Ferolin"], "requestedValue":[""] },
                            {"objectID": "5297d81b025a83e404000007", "assignedValue": ["Scrum Master"], "requestedValue":[""] },
                            {"objectID": "5297d822025a83e404000008", "assignedValue": ["rosana.ferolin@globalzeal.net"], "requestedValue":[""] },
                            {"objectID": "5297d829025a83e404000009", "assignedValue": [" "], "requestedValue":[""] },
                            {"objectID": "52982cf6da4555da60000002", "assignedValue": ["Rosana.Ferolin2"], "requestedValue":[""] },
                            {"objectID": "5297d856025a83e40400000a", "assignedValue": ["Sana - Not Active"], "requestedValue":[""] },
                            {"objectID": "5297ef021dd16c491c000002", "assignedValue": ["Rosana.Ferolin"],"requestedValue":["Javascript","HTML"] },
                         ],
                "isActive": 0
            };
        user.Users.create(employees, function (err, doc) {
             if (err) {
                 console.log(err);
             } else {
                 res.send(200, doc)
                 console.log('Added to Users');
             }
         });    
    }

    //curl -X DELETE 'http://localhost:3000/profile/[id]'
    function deleteUser (req, res) {
        var id = req.params.id;
        user.Users.findByIdAndRemove(id, function (err, doc) {
            if (err) {
              console.log(err);
              res.send(404, err);
            } else {
              res.send(200, doc);
            }
        })
    }


}