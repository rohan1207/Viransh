import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    index: true,
  },
  // House / Flat No & Building Name
  house: { type: String },
  buildingName: { type: String },
  // Street / Locality (existing field kept for backward compatibility)
  street: {
    type: String,
    required: [true, 'Street / Locality is required.'],
  },
  locality: { type: String },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  state: {
    type: String,
    required: [true, 'State is required.'],
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required.'],
  },
  country: {
    type: String,
    required: [true, 'Country is required.'],
    default: 'India',
  },
  landmark: { type: String },
  deliveryInstructions: { type: String, maxlength: 500 },
  addressType: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Home' },
  latitude: { type: Number },
  longitude: { type: Number },
  phone: {
    type: String,
    required: [true, 'Phone number is required.'],
  },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

export default Address;
