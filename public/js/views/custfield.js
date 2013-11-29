var dDown = ['Textbox', 'Text Area', 'Dropdown', 'Radio Button', 'Check Box'];
function getIndex(text){
    var id = -1;
    for (var i =  0; i < dDown.length; i++) {
        if(dDown[i] == text){
            id = i
            break;
        }
    }
}

directory.CustFieldView = Backbone.View.extend({

    events:{
        "click .ddb" : "changedDown",
    },

    render:function () {
        this.$el.html(this.template());
        for (var i =  0; i < dDown.length; i++) {
            if(i == 0){
                this.$el.find("#fieldTypeDDownBtn").html(dDown[i]);
                this.$el.find("#fieldTypeDDownId").val(1);
            }
            this.$el.find("#fieldTypeDDown").append("<li class='ddb'><a>" + dDown[i] + "</a></li>");
        };
        return this;
    },

    changedDown: function (ev){
        var text = $(ev.target).html();
        $("#fieldTypeDDownBtn").html(text);
        $("#fieldTypeDDownId").val(getIndex(text))
    }
});