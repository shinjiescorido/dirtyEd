var mongoose = require('mongoose');

mongoose.connect("localhost:27017/employeeDirectory", function (err) {
  if (err) {
      console.log(err);
  } else {
      console.log('Connected to mongodb!');
  }
});

exports.mongoose = mongoose;

var customFieldsSchema = mongoose.Schema({
  label: { type: String, required: true },
  fieldType: { type: Number },
  accessModifier: Boolean,
  values: [String],
  required: Boolean
})

var userSchema = mongoose.Schema

var customFields = mongoose.model('CustomFields', customFieldsSchema);
exports.customFieldsModel = customFields;
