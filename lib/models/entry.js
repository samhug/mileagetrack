'use strict';

var restful  = require('node-restful'),
    Schema   = restful.mongoose.Schema;
    
/**
 * Entry Schema
 */
var EntrySchema = new Schema({
  vehicle:  { type: Schema.ObjectId, required: true,  ref: 'VehicleSchema' },
  date:     { type: Date,   required: true },
  odometer: { type: Number, required: true },
  trip:     { type: Number },
  gallons:  { type: Number, required: true },
  price:    { type: Number, required: true }
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
