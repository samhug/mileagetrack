'use strict';

var restful  = require('node-restful'),
    Schema   = restful.mongoose.Schema;

/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
  name: String,
  info: String,
  owner: {type: Schema.ObjectId, ref: 'UserSchema'}
});

restful.model('Vehicle', VehicleSchema);
