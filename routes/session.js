module.exports = function(app, user) {
  
  app.get('/logout', logout);
  app.get('/logouts', function (req,res){
    res.end(req.session.loggedUser);
  });
  app.post('/login', function (req,res){
    var username = req.body.username;
    var password = req.body.password;
       // res.send(200,1)
    if(username == "admin" && password == "password"){
        req.session.loggedUser = username;
        res.jsonp("1");
    }else{
        res.jsonp("2");
    }
    
  });
  /*
    Clear all user sessions.
  */
  function islogged(theid){
     return (theid);
       }
  function logout(req, res) {
    if (req.session) {
      req.session.destroy();
    }
    //redirect somewhere
  }

  //curl http://localhost:3000/login?username=Rosana.Ferolin&password=ladyinblack
  function login(req, res) {
     if(islogged(req.session.loggedUser)) res.redirect('/');
    var options = {};
    if (req.query.skip) {
      option.skip = req.query.skip;
    }
    if (req.query.limit) {
      option.limit = req.query.limit;
    }
    var username = req.body.username;
    var password = req.body.password;
    var usernameFieldLabel = "Username";
    var passwordFieldLabel = "Password";
    var userObjectID = getUserField(usernameFieldLabel);
    var user = getUser(userObjectID);
    var userid = "";
    if (user) {
      userid = user._id;

      var passid = getPassID(passwordFieldLabel);
      if (passid) {
        var validationRes = validateCredentials(user, passid);
        if (validationRes) {
          //redirect somewhere
          res.send("ok");
        } else {
          res.send("ther eare errors");
          //display error
          //password mismatch
        }
      }
    } else {
      //display error
      //user does not exist.
    }
  }

  function getUserField(usernameFieldLabel) {
    var id = "";
    user.customFieldsModel.findOne({
      label: usernameFieldLabel
    }, function(err, doc) {
      if (err) {
        console.log(err);
        res.send(500, err);
      } else {
        //Username Field ID
        id = doc._id;
      }
    });
    return id;

  }

  function getUser(userObjectID) {
    var userid = "";
    user.Users.findOne({
      field: {
        $elemMatch: {
          objectID: id,
          assignedValue: username
        }
      },
      isActive: 1
    }, null, function(err, doc) {
      if (err) {
        console.log(err);
        res.send(500, err);
      } else {
        res.send(200, doc);
        if (doc) {
          //User ID
          var userid = doc._id;
        }
      }
    });
    return userid;
  }

  function getPassID(passwordFieldLabel) {
    var passid = "";
    user.customFieldsModel.findOne({
      label: passwordFieldLabel
    }, function(err, doc) {
      if (err) {
        console.log(err);
        res.send(500, err);
      } else {
        //Password Field ID
        passid = doc._id;
      }
    });
    return passid;
  }

  function validateCredentials(user, passid) {

    var validationRes = false;

    for (var i = 0; i < user.field.length; i++) {
      var obj = user.field[i];
      // console.log(obj.objectID + '=' + passid);
      if (obj.objectID.toString() == passid.toString()) {
        var bcrypt = require('bcrypt');
        bcrypt.compare(password, obj.assignedValue[0], function(err, res) {
          if (err) {
            console.log(err);
            res.send(500, err);
          } else {
            if (res == true) {
              console.log('Valid Credentials!');
              validationRes = true;
              req.session.userSessionID = userid;
              console.log(req.session);
            } else {
              console.log("Invalid Credentials");
            }
          }
        });

      }
    }
    return validationRes;
  }
}