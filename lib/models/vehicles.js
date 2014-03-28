'use strict';

var restful  = require('node-restful'),
    Schema   = restful.mongoose.Schema;

/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
  name:  { type: String, required: true },
  info:  { type: String, required: true },
  owner: { type: Schema.ObjectId, required: true, ref: 'UserSchema' }
});

restful.model('Vehicle', VehicleSchema);
