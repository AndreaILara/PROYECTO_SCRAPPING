const mongoose = require('mongoose');

const characterSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: "character"
  }
)

const Character = mongoose.model('character', characterSchema, 'character');

module.exports = Character;