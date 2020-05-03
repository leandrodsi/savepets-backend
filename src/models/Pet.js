const mongoose = require("mongoose");
const PointSchema = require("./utils/PointSchema");

const PetSchema = new mongoose.Schema({
  species: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    default: "vira lata",
  },
  size: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  puppy: {
    type: Boolean,
    default: false,
  },
  rescued: {
    type: Boolean,
    default: false,
  },
  condition: {
    type: String,
  },
  location: {
    type: PointSchema,
    index: "2dsphere",
  },
});

module.exports = mongoose.model("Pet", PetSchema);
