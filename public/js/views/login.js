directory.LoginView = Backbone.View.extend({

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
        if(tz_err(1, "#exampleInputEmail1", !$("#exampleInputEmail1").val(), "Please Provide a User Name")) {
            tz_err(2, "#exampleInputEmail1", $("#exampleInputEmail1").val().length < 6 || $("#exampleInputEmail1").val().length > 10, "User Name must be between 6-10 characters");
            tz_err(3, "#exampleInputEmail1", !$("#exampleInputEmail1").val().match("/^[A-Za-z0-9]$/"), "Invalid User Name");
        }
        tz_err(4, "#exampleInputPassword1", !$("#exampleInputPassword1").val(), "Please Provide a password");
    }
});

