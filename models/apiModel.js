const mongoose = require("mongoose");

const apiSchema = mongoose.Schema(
  {
    method: {
      type: String,
      required: [true, "Please select method"],
    },
    description: {
      type: String,
      required: [true, "Please enter api title"],
    },
    endpoint: {
      type: String,
      required: [true, "Please endpoint"],
    },
   
  },
  {
    timestamps: true,
  }
);

const Apis = mongoose.model("api", apiSchema);

module.exports = Apis;
