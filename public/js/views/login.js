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
        tz_err(1, "#exampleInputEmail1", !$("#exampleInputEmail1").val(), "Please Provide a User ID");
        tz_err(2, "#exampleInputPassword1", !$("#exampleInputPassword1").val(), "Please Provide a password");
    }
});

