var mongoose = require('mongoose');

var uri = 'mongodb://root:root@ds039487.mongolab.com:39487/ed';
mongoose.connect(uri, function (err) {
  if (err) {
      console.log(err);
  } else {
      console.log('Connected to mongodb!');
  }
});

exports.mongoose = mongoose;

var ObjectId = mongoose.Schema.Types.ObjectId;

var customFieldsSchema = mongoose.Schema({
  label: { type: String, required: true },
  fieldType: { type: Number, required: true },
  isPublic: Boolean,
  values: [String],
  isRequired: Boolean,
  isBasic: Boolean,
  isEditable: Boolean,
  isActive: Boolean
});

var userSchema = mongoose.Schema({
  field: [{ objectID: ObjectId, assignedValue: String, requestedValue: String }],
  isActive: Boolean
});

var notificationsSchema


var CustomFields = mongoose.model('CustomFields', customFieldsSchema);
exports.CustomFields = CustomFields;

var User = mongoose.model('User', userSchema);
exports.User = User;

