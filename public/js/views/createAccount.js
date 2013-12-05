directory.AccountModel = Backbone.Model.extend({

  url: '/add-user-temp'

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

      this.accountModel    = new directory.AccountModel;

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

  submit: function(e) {
    e.preventDefault();

    var form = $('.createAccount');

    if(!this.hasError(form)) {

      this.accountModel.set(this.getFormData(form));
      this.accountModel.save();
      this.successCreate();

    }
  },

  getFormData: function(form) {
    var mappedData = this.mapArray(form.serializeArray()),
        field,
        data;

    data = {
      "field": [],
      "isActive": 1
    }

    $.each(mappedData, function(key, value) {
      data.field.push({
        "objectID"        : key.replace('[]', ''),
        "assignedValue"   : value,
        "requestedValue"  : []
      })
    });
    // console.log(form.serializeArray());
    console.log(mappedData);
    return data;
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
    var result    = false,
        email     = this.getEmailValue(),
        username  = this.getUsernameValue();

    if(this.emptyFields(form.serializeArray())) {

      this.showEmptyFields(this.emptyFields(form.serializeArray()));
      result = true;

    } else if((!this.validEmail(email)) || (this.hasSpecialChar(username)) || (!this.validUsernameLength(username))) {

      if(!this.validEmail(email)) {
        this.showInvalidEmail();
      }
      if((this.hasSpecialChar(username)) || (!this.validUsernameLength(username))) {
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

  validUsernameLength: function(username) {
    var result = true;
    if(username.length < 6) {
      result = false;
    }
    if(username.length > 10) {
      result = false;
    }
    return result;
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
        (action === 'save') ? form[0].reset() : top.location = '#';
      }, (action === 'save') ? 1000 : 2000);
    }
  },

  mapArray: function(arr) {
    var obj = {};

    $.map(arr, function(key) {
      obj[key['name'].replace('field_', '')] = (key['name'].indexOf('[]') !== -1) ? [] : [key['value']];
    });

    $.each(obj, function(key, value) {
      if(key.indexOf('[]') !== -1) {
        $('[name="field_'+ key +'"]').each(function() {
          if(this.checked) {
            obj[key].push(this.value);
          }
        });
      }
    });

    return obj;
  }

});


















