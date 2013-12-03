directory.Employee = Backbone.Model.extend({

    urlRoot:"/employees",

    initialize:function () {
        this.reports = new directory.EmployeeCollection();
        this.reports.url = this.urlRoot + "/" + this.id + "/reports";
    }

});

directory.EmployeeCollection = Backbone.Collection.extend({

    model: directory.Employee,
    url:"/employees"

});

directory.BasicField = Backbone.Model.extend({

    urlRoot:"/custom-fields/1",

    initialize:function () {
        this.reportsBasic = new directory.BasicFieldCollection();
    }

});

directory.BasicFieldCollection = Backbone.Collection.extend({

    model: directory.BasicField,

    url:"/custom-fields/1"

});

directory.CustomField = Backbone.Model.extend({

    urlRoot:"/custom-fields/0",

    initialize:function () {
        this.reportsCBasic = new directory.CustomFieldCollection();
    }

});

directory.CustomFieldCollection = Backbone.Collection.extend({

    model: directory.CustomField,
    url:"/custom-fields/0"

});