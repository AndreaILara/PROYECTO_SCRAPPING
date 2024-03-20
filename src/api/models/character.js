const mongoose = require('mongoose');

const characterSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "character"
  }
)

const Character = mongoose.model('character', characterSchema, 'character');

module.exports = Character;