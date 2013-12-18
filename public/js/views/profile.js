directory.ProfileView = Backbone.View.extend({

    events: {
      "click a.profileAction": "showConfirmation",
      "mouseout a.profileAction": "hideConfirmation",
      "mouseover a.actions": "showTooltip",
      "click a.actions": "showConfirmation",
      "mouseout a.actions": "hideConfirmation"
    },

    initialize: function() {
      var self = this;

      if(this.collection) {

	this.collection.user.attributes.field.forEach(function (field) {

	  // console.log(self.getFieldAttr(field.objectID));
	  var fieldAttributes = self.getFieldAttr(field.objectID);
	  if(fieldAttributes) {
	    field.attributes = fieldAttributes;
	  }
	  // console.log(field);
	});

	this.collection.user.attributes.jobPosition = this.getJobPosition();
      }
    },

    render: function() {

	if(this.collection) {
	  this.$el.html(this.template(this.collection.user.attributes));
	}

	return this;
    },

    getFieldAttr: function(fieldID) {
      var data;

      this.collection.fields.models.forEach(function (field) {
	if(field.attributes._id === fieldID) {
	  data = field.attributes;
	}
      });
      return data;
    },

    getJobPosition: function() {
      var data;

      this.collection.user.attributes.field.forEach(function (field) {

	if((field.attributes) && (field.attributes.label === 'Job Position')) {
	  data = field.assignedValue[0];
	}
      });
      return data;
    },

    showTooltip: function(e) {
      e.preventDefault();
      var target = $(e.currentTarget);

      target.tooltip('show');
    },

    showConfirmation: function(e) {
      e.preventDefault();
      var target = $(e.currentTarget);

      target.tooltip('hide');

      target.confirmation({
	"title": "Do you really want to save changes?",
	"animation": true,
	"popout": "true"
      });
    },

    hideConfirmation: function(e) {
      e.preventDefault();
      var target = $(e.currentTarget);

      target.confirmation('hide');
      target.popover('hide');
    },

    preventDefault: function(e) {
      e.preventDefault();
    }

});