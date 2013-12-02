var dDown = [{
    id: 1,
    label: 'Textbox',
    mult: 0
}, {
    id: 2,
    label: 'Text Area',
    mult: 0
}, {
    id: 3,
    label: 'Dropdown',
    mult: 1
}, {
    id: 4,
    label: 'Radio Button',
    mult: 1
}, {
    id: 5,
    label: 'Check Box',
    mult: 1
}];

function getIndex(text) {
    var id = null;
    for (var i = 0; i < dDown.length; i++) {
        if (dDown[i].label == text) {
            id = dDown[i]
            break;
        }
    }
    return id;
}

function getIndexText(index) {
    var id = null;
    for (var i = 0; i < dDown.length; i++) {
        if (dDown[i].id == index) {
            id = dDown[i].label
            break;
        }
    }
    return id;
}

function getIndexById(idx) {
    var id = null;
    for (var i = 0; i < dDown.length; i++) {
        if (dDown[i].id == idx) {
            id = dDown[i]
            break;
        }
    }
    return id;
}

directory.cfListView = Backbone.View.extend({

    tagName: 'tbody',

    className: 'customs',

    render: function() {
        this.$el.empty();
        var firstProp;
        if (this.model)
            for (var key in this.model["attributes"]) {
                if (this.model["attributes"].hasOwnProperty(key)) {
                    this.$el.append(new directory.bfListItemView({
                        model: this.model["attributes"][key]
                    }).render().el);
                }
            }
        return this;
    }
});

directory.cfListItemView = Backbone.View.extend({

    tagName: "tr",

    render: function() {
        var data = _.clone(this.model);

        data.newType = getIndexText(data.fieldType);
        data.newValues = data.values.join(', ')
        data.isPublicStr = data.isPublic ? "Public" : "Private"
        data.isRequiredStr = data.isRequired ? "Required" : "Optional"
        data.isEditableStr = data.isEditable ? "Editable" : "Permanent"

        this.$el.html(this.template(data));
        return this;
    }

});

directory.bfListView = Backbone.View.extend({

    tagName: 'tbody',

    className: 'basics',

    render: function() {
        this.$el.empty();
        var firstProp;
        if (this.model)
            for (var key in this.model["attributes"]) {
                if (this.model["attributes"].hasOwnProperty(key)) {
                    this.$el.append(new directory.bfListItemView({
                        model: this.model["attributes"][key]
                    }).render().el);
                }
            }
        return this;
    }
});

directory.bfListItemView = Backbone.View.extend({

    tagName: "tr",

    render: function() {
        var data = _.clone(this.model);

        data.newType = getIndexText(data.fieldType);
        data.newValues = data.values.join(', ')
        data.isPublicStr = data.isPublic ? "Public" : "Private"
        data.isRequiredStr = data.isRequired ? "Required" : "Optional"
        data.isEditableStr = data.isEditable ? "Editable" : "Permanent"

        this.$el.html(this.template(data));
        return this;
    }

});

directory.CustFieldView = Backbone.View.extend({

    events: {
        "click .ddb": "changedDown",
        "click #addbutn": "addFields",
        "click .remVal": "remFields",
        "click #clker": "toggleHider",
        "click #login": "submiter"
    },

    render: function() {
        for (var i = 0; i < dDown.length; i++) {
            if (i == 0) {
                this.$el.find("#fieldTypeDDownBtn").html(dDown[i].label);
                this.$el.find("#fieldTypeDDownId").val(1);
            }
            this.$el.find("#fieldTypeDDown").append("<li class='ddb'><a>" + dDown[i].label + "</a></li>");
        };
        this.$el.html(this.template());

        if (this.model[0])
            $(this.el).find(".basics").append(new directory.bfListView({
                model: this.model[0]
            }).render().el);

        if (this.model[1])
            $(this.el).find(".customs").append(new directory.cfListView({
                model: this.model[1]
            }).render().el);

        return this;
    },

    changedDown: function(ev) {
        var text = $(ev.target).html();
        var obj = getIndex(text);
        $("#fieldTypeDDownBtn").html(text);
        $("#fieldTypeDDownId").val(obj.id)

        $("#addValues").children().each(function() {
            $(this).remove();
        });

        tz_err_inline("#lableParam", false, "");
        tz_err_inline("#valxx", false, "");

        if (obj.mult == 0)
            $("#addbutn").css('display', 'none').css('visibility', 'hidden');
        else
            $("#addbutn").css('display', 'inline-block').css('visibility', 'visible');

    },

    addFields: function() {
        $("#addValues").append(
            "<div style=\"vertical-align: top\" class=\"newval\">" +
            "     <input type=\"text\" class=\"form-control\" id=\"label\" placeholder=\"value\" style=\"margin-bottom: 0px;\">" +
            "     <button style=\"text-align: right;\" class=\"btn remVal\"><i class=\"icon-minus\"></i>" +
            "    </button>" +
            "</div>");
    },

    remFields: function(ev) {
        $(ev.target).closest('.newval').remove();
    },

    toggleHider: function() {
        $("#info").css('display', 'none').css('visibility', 'hidden');

        if ($("#addHider").css('display') == "none")
            $("#addHider").css('display', 'block').css('visibility', 'visible');
        else
            $("#addHider").css('display', 'none').css('visibility', 'hidden');
    },

    submiter: function() {
        $("#info").css('display', 'none').css('visibility', 'hidden');
        var isValid = true;
        isValid = isValid & tz_err_inline("#lableParam", !$('#lableParam').val(), "Please fill up empty field.");
        if (getIndexById($("#fieldTypeDDownId").val()).mult == 1)
            isValid = isValid & tz_err_inline("#valxx", !$('#valxx').val(), "Please fill up empty field.");

        if (isValid) {
            $("#addHider").css('display', 'none').css('visibility', 'hidden');
            $("#lableParam").val("");

            for (var i = 0; i < dDown.length; i++) {
                if (i == 0) {
                    $("#fieldTypeDDownBtn").html(dDown[i].label);
                    $("#fieldTypeDDownId").val(1);
                }
            };

            $("#valxx").val("");

            //PERFORM SAVE HERE

            $("#info").html("Successfully added new field.")
            $("#info").css('display', 'block').css('visibility', 'visible');
        }

        return false;
    }
});
