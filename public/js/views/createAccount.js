directory.AccountModel = Backbone.Model.extend({

  url: '/add-user-temp',

});

directory.Profile = Backbone.Model.extend({

  urlRoot: '/username'

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

  initialize: function() {

  },

  render: function() {
    var data        = this.model;
    data.fieldName  = 'field_'+ data._id;
    // console.log(data);
    if(data.isActive && data.label.toLowerCase().indexOf('password') === -1) {
      this.$el.html(this.template(data));
    }
    return this;
  }

});

directory.CreateAccountView = Backbone.View.extend({

  events: {
    "click .formAction"       : "formAction",
    "submit .createAccount"   : "submit"
  },

  initialize: function() {

    if(this.collection) {

      this.collection.basic.on('add', this.showAdded, this);
      this.collection.basic.on('change', this.showChanges, this);

      this.collection.custom.on('add', this.showAdded, this);
      this.collection.custom.on('change', this.showChanges, this);

      this.basicListView      = new directory.FormFieldListView({ collection: this.collection.basic, className: 'basic' });
      this.customListView     = new directory.FormFieldListView({ collection: this.collection.custom, className: 'custom' });
      this.accountModel       = new directory.AccountModel;
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

    var form = $('.createAccount'),
        self = this;

    if(!this.hasError(form)) {

      this.usernameExists(this.getUsernameValue(), function(usernameExists) {

        if(usernameExists) {
          self.showInvalidUsername('Username is already taken.');
        } else {
          self.accountModel.set(self.getFormData(form));
          self.accountModel.save();
          self.successCreate();

          setTimeout(function() {
            (e.target.id === 'saveAndClose') ? top.location = '#' : form[0].reset();
          }, (e.target.id === 'saveAndClose') ? 2000 : 1000);
        }

      });
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
    // console.log(mappedData);
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
      if(!$('.required[name="'+ attr.name +'"]').val()) {
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

    this.removeErrors(form);

    if((this.emptyFields(form.serializeArray())) || (!this.validEmail(email)) || (this.hasSpecialChar(username)) || (!this.validUsernameLength(username))) {

      if(!this.validEmail(email)) {
        this.showInvalidEmail();
      }
      if((!this.validUsernameLength(username))) {
        this.showInvalidUsername('Username should be 6-10 characters.');
      }
      if((this.hasSpecialChar(username))) {
        this.showInvalidUsername('Username should have no special characters.');
      }
      if(this.emptyFields(form.serializeArray())) {
        this.showEmptyFields(this.emptyFields(form.serializeArray()));
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

  usernameExists: function(username, callback) {

    var employeeCollection = new directory.Profile({ id: username });

    employeeCollection.fetch({
      success: function(docs) {
        callback(docs);
      },
      error: function() {
        callback(null);
      }
    });
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

  getUsernameId: function() {
    var id = '';
    $.each(this.collection.basic.attributes, function(key, attr) {
      if(attr.label.toLowerCase().indexOf('username') !== -1) {
        id = attr._id;
      }
    });
    return id;
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

  removeErrors: function(form) {
    var data = form.serializeArray();

    data.forEach(function(obj) {
      var element = $('[name="'+ obj.name +'"]');

      if(obj.value) {
        element.css('border', '1px solid #CCC')
        .parent().css('color', '#000')
        .find('span').html('');

        if((element.attr('type') === 'radio') || (element.attr('type') === 'checkbox')) {
          element.parent().parent()
          .find('span').html('');
        }
      }
    });
    
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

  showInvalidUsername: function(message) {
    $('input[type="text"]').each(function() {
      var placeholder = $(this).attr('placeholder').toLowerCase(),
          _this       = $(this);

      if(placeholder.indexOf('username') !== -1) {

        _this.css('border', '1px solid #b94a48').parent().find('span').css('color', '#b94a48')
        .html(message).css('font-size', '14px');

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

    form.attr('id', action);

    // if(!this.hasError(form)) {
    //   form[0].reset();
    //   setTimeout(function() {
    //     (action === 'saveAndClose') ? top.location = '#' : false;
    //   }, 2000);
    // }
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


















