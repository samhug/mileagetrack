'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
  name: String,
  info: String,
  owner: {type: Schema.ObjectId, ref: 'UserSchema'}
});

/**
 * Validations
 */
/*VehicleSchema.path('awesomeness').validate(function (num) {
  return num >= 1 && num <= 10;
}, 'Awesomeness must be between 1 and 10');*/

mongoose.model('Vehicle', VehicleSchema);
