directory.LoginView = Backbone.View.extend({
    // model: directory.auth,
    events:{
        "click #showMeBtn":"showMeBtnClick",
        "click #forgot" : "resetPass",
        "click #login" : "dovalidate"
    },

    render:function () {
        this.$el.html(this.template());
        return this;
    },

    showMeBtnClick:function () {
        console.log("showme");
        directory.shellView.search();
    },

    resetPass: function() {
        alert("this will redirect to reset password")
        return false;
    },

    dovalidate: function() {
        var errormsg = "Invalid Username and Password!";
       
            /*alert(tz_err(1, "#exampleInputEmail1", !$("#exampleInputEmail1").val(), errormsg));
            
             tz_err(2, "#exampleInputEmail1", $("#exampleInputEmail1").val().length < 6 || $("#exampleInputEmail1").val().length > 10, errormsg);
             tz_err(3, "#exampleInputEmail1", !$("#exampleInputEmail1").val().match("/^[A-Za-z0-9]$/"), errormsg);
             tz_err(4, "#exampleInputPassword1", !$("#exampleInputPassword1").val(), errormsg);*/

      if(!$("#exampleInputEmail1").val()){
        $('#errLogin').html(errormsg);
            return false;
      }else if($("#exampleInputEmail1").val().length < 5 || $("#exampleInputEmail1").val().length > 10){
        $('#errLogin').html(errormsg);
            return false;
      }else if(!$("#exampleInputPassword1").val()){
        $('#errLogin').html(errormsg);
            return false;
      }
    var logins = new directory.auth;
     //logins.save({username:'admin'},)
     logins.set({username: $("#exampleInputEmail1").val(),  password: $("#exampleInputPassword1").val()});
    logins.save({},{
        success: function(model,response){
        //alert("success");
    // alert(response);
        if(response = 1){
                $('form').html('Logged in Successfully!');
                //window.location('/');
    }
}
       });
       
    }
   
});

