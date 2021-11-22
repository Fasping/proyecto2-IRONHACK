const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    thumbnail: { type: String },
    comic: [{ resourceURI: { type: String }, name: { type: String } }],
  },
  { timestamps: true }
);

const Character = model("Character", characterSchema);

module.exports = Character;
