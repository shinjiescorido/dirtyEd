directory.AccountModel = Backbone.Model.extend({

  validate: function(obj, options) {
  }

});

directory.CreateAccountView = Backbone.View.extend({

  events: {
    "click .test"             : "testAlert",
    "click .formAction"       : "formAction",
    "submit .createAccount"   : "submit"
  },

  initialize: function() {

    if(this.collection) {

      this.collection.basic.on('add', this.showAdded, this);
      this.collection.basic.on('change', this.showChanges, this);

      this.collection.custom.on('add', this.showAdded, this);
      this.collection.custom.on('change', this.showChanges, this);

      this.basicListView   = new directory.FormFieldListView({ collection: this.collection.basic, className: 'basic' });
      this.customListView  = new directory.FormFieldListView({ collection: this.collection.custom, className: 'custom' });

    }
    
  },

  render: function() {
    this.$el.html(this.template());

    if(this.collection) {
      $('.table-basic', this.el).append(this.basicListView.render().el);
      $('.table-custom', this.el).append(this.customListView.render().el);
    }

    return this;
  },

  showAdded: function() {
    alert('showAdded');
  },

  showChanges: function() {
    alert('showChanges');
  },

  testAlert: function() {
    alert('TEST!');
  },

  submit: function(e) {
    e.preventDefault();

    var form = $('.createAccount');

    if(!this.hasError(form)) {
      console.log(form.serializeArray());
      this.successCreate();
    }
  },

  emptyFields: function(obj) {
    var emptyFields = [],
        checkboxes  = [],
        radios      = [];

    $.each(obj, function(key, attr) {
      if(!attr.value) {
        emptyFields.push(attr.name);
      }
    });

    // CHECKBOXES
    $('.required[type="checkbox"]').each(function() {
      checkboxes.push($(this).attr('name'));
    });
    if(this.notChecked(checkboxes)) {
      $.each(this.notChecked(checkboxes), function(index, value) {
        var isChecked = $('[name="'+ value +'"]').is(':checked');

        if(!isChecked) {
          emptyFields.push(value);
        }
      });
    }
    // /checkboxes

    // RADIOS
    $('.required[type="radio"]').each(function() {
      radios.push($(this).attr('name'));
    });
    if(this.notChecked(radios)) {
      $.each(this.notChecked(radios), function(index, value) {
        var isChecked = $('[name="'+ value +'"]').is(':checked');

        if(!isChecked) {
          emptyFields.push(value);
        }
      });
    }
    // /radios

    return (emptyFields.length) ? emptyFields : false;
  },

  hasError: function(form) {
    var result = false;
    if(this.emptyFields(form.serializeArray())) {

      this.showEmptyFields(this.emptyFields(form.serializeArray()));
      result = true;

    } else if((!this.validEmail(this.getEmailValue())) || (this.hasSpecialChar(this.getUsernameValue()))) {

      if(!this.validEmail(this.getEmailValue())) {
        this.showInvalidEmail();
      }
      if(this.hasSpecialChar(this.getUsernameValue())) {
        this.showInvalidUsername();
      }
      result = true;
    }
    return result;
  },

  hasSpecialChar: function(value) {
    var re = /^[^*|\":<>[\]{}`\\()';@&$]+$/;
    return re.test(value) ? false : true;
  },

  validEmail: function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // console.log(email);
    return re.test(email);
  },

  getEmailValue: function() {
    var email = '';
    $('input[type="text"]').each(function() {
      var placeholder = $(this).attr('placeholder').toLowerCase();

      if(placeholder.indexOf('email') !== -1) {
        email = $(this).val();
      }
    });
    return email;
  },

  getUsernameValue: function() {
    var username = '';
    $('input[type="text"]').each(function() {
      var placeholder = $(this).attr('placeholder').toLowerCase();

      if(placeholder.indexOf('username') !== -1) {
        username = $(this).val();
      }
    });
    return username;
  },

  showEmptyFields: function(fields) {
    $.each(fields, function(index, value) {
      var element = $('[name="'+ value +'"]');

      element.css('border', '1px solid #b94a48')
      .parent().css('color', '#b94a48')
      .find('span').css('color', '#b94a48')
      .html('Please fill up empty field.').css('font-size', '14px');

      if((element.attr('type') === 'radio') || (element.attr('type') === 'checkbox')) {
        element.parent().parent()
        .find('span').css('color', '#b94a48')
        .html('Please fill up empty field.').css('font-size', '14px');
      }

    });
  },

  showInvalidEmail: function() {
    $('input[type="text"]').each(function() {
      var placeholder = $(this).attr('placeholder').toLowerCase(),
          _this       = $(this);

      if(placeholder.indexOf('email') !== -1) {

        _this.css('border', '1px solid #b94a48').parent().find('span').css('color', '#b94a48')
        .html('You have input an invalid Email Add.').css('font-size', '14px');

      }
    });
  },

  showInvalidUsername: function() {
    $('input[type="text"]').each(function() {
      var placeholder = $(this).attr('placeholder').toLowerCase(),
          _this       = $(this);

      if(placeholder.indexOf('username') !== -1) {

        _this.css('border', '1px solid #b94a48').parent().find('span').css('color', '#b94a48')
        .html('You have input an invalid username.').css('font-size', '14px');

      }
    });
  },

  successCreate: function(e) {
    this.modalView = new directory.ModalView({
      model: {
        message: {
          main: 'Your account information has been successfully created.',
          note: 'Notification will be sent to the employee’s email add with a generated password.'
        }
      },
      className: 'modal'
    });

    $('.createAccount', this.el).prepend(this.modalView.render().el);
  },

  // getFormData: function(form) {
  //   var FormData = this.mapArray( form.serializeArray() );
  //   console.log(FormData);
  // },

  notChecked: function(arr) {
    var checkedIndex,
        notChecked = [];

    $.each(arr, function(index, value) {
      $('[name="'+ value +'"]').each(function() {

        if(!this.checked) {
          if(notChecked.indexOf($(this).attr('name')) === -1) {
            notChecked.push($(this).attr('name'));
          }
        }
      });
    });

    return (notChecked.length) ? notChecked : false;
  },

  formAction: function(e) {
    var action  = e.target.id,
        form    = $('.createAccount');

    if(!this.hasError(form)) {
      setTimeout(function() {
        (action === 'save') ? form[0].reset() : top.location = '#home';;
      }, (action === 'save') ? 1000 : 2000);
    }
  },

  mapArray: function(arr) {
    var obj = {};

    $.map(arr, function(value, index) {
        obj[value['name'].replace('field_', '')] = value['value'];
    });
    return obj;
  }

});

directory.FormFieldListView = Backbone.View.extend({

  tagName: 'tbody',

  render: function() {
    this.$el.empty();

    _.each(this.collection.attributes, function (docs) {
      this.$el.append(new directory.FormFieldListItemView({ model: docs }).render().el);
    }, this);
    return this;
  }

});

directory.FormFieldListItemView = Backbone.View.extend({

  tagName: 'tr',

  render: function() {
    var data        = this.model;
    data.fieldName  = 'field_'+ data._id;
    // console.log(data);
    this.$el.html(this.template(data));
    return this;
  }

});


















