const Character = require("../models/character");
const character = require("../../../character.json")

const insertManyCharacter = async (req, res, next) => {
  try {
    await Character.insertMany(character.results)
    return res.status(201).json("All characters created")

  } catch (error) {
    return res.status(400).json(error);
  }
}

const getAllCharacter = async (req, res, next) => {
  try {

    const allCharacters = await Character.find()
    return res.status(200).json(allCharacters)

  } catch (error) {
    return res.status(400).json(error)
  }
}

const getCharacterById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterById = await Character.findById(id)
    return res.status(200).json(characterById)
  } catch (error) {
    return res.status(400).json("Request error");
  }
}


const getCharacterByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const characters = await Character.find({ name: name })
    return res.status(200).json(characters)

  } catch (error) {
    return res.status(400).json("Request error");
  }
}


module.exports = { insertManyCharacter, getAllCharacter, getCharacterById, getCharacterByName }