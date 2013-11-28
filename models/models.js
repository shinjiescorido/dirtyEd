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

var customFieldsSchema = mongoose.Schema({
  label: { type: String, required: true },
  fieldType: { type: Number, required: true },
  isPublic: Boolean,
  values: [String],
  isRequired: Boolean,
  isBasic: Boolean,
  isEditable: Boolean
})

// var userSchema = mongoose.Schema({
//   fieldID: Obj
// })

// var userSchema = mongoose.Schema

var customFields = mongoose.model('CustomFields', customFieldsSchema);
exports.customFieldsModel = customFields;


