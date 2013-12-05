directory.ModalView = Backbone.View.extend({

  events: {
    "click .closeModal": "closeModal"
  },

  render: function() {
    this.$el.html(this.template(this.model.message)).fadeIn();
    return this;
  },

  closeModal: function() {
    this.remove();
  }

});