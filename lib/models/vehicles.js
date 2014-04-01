'use strict';

var restful  = require('node-restful'),
    Schema   = restful.mongoose.Schema;

/**
 * Vehicle Schema
 */
var VehicleSchema = new Schema({
  name:  { type: String, required: true },
  info:  { type: String},
  owner: { type: Schema.ObjectId, required: true, ref: 'UserSchema' },
  entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }]
});

restful.model('Vehicle', VehicleSchema);
