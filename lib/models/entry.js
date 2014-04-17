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
  gallons:  { type: Number, required: true },
  price:    { type: Number, required: true }
});

/**
 * Validations
 */
EntrySchema.path('odometer').validate(function (num) {
  return num >= 0;
}, 'The odometer reading can\'t be negative');

restful.model('Entry', EntrySchema);
