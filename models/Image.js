const { Schema } = require("mongoose");

const imageSchema = new Schema({
  url: {
    type: String,
  },
});

module.exports = imageSchema;
