'use strict';

var restful  = require('node-restful'),
    Schema   = restful.mongoose.Schema;
    
/**
 * Entry Schema
 */
var EntrySchema = new Schema({
  date: Date,
  odometer: Number,
  trip: Number,
  gallons: Number,
  price: Number,
  vehicle: {type: Schema.ObjectId, ref: 'VehicleSchema'}
});

/**
 * Validations
 */
EntrySchema.path('odometer').validate(function (num) {
  return num >= 0;
}, 'The odometer reading can\'t be negative');

EntrySchema.path('trip').validate(function (num) {
  return num > 0;
}, 'The the trip value must be bigger than zero.');

restful.model('Entry', EntrySchema);
