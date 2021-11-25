const { Schema, model } = require("mongoose");

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    // height: { type: Number },
    // affiliations: { type: [String] },
    image: { type: String },
    
  },
  { timestamps: true }
);

const Character = model("Character", characterSchema);

module.exports = Character;
