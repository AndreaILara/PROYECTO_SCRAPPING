const { insertManyCharacter, getAllCharacter, getCharacterById, getCharacterByName } = require('../controllers/character');

const characterRouter = require('express').Router();

characterRouter.post('/create', insertManyCharacter)
characterRouter.get('/:id', getCharacterById)
characterRouter.get('/name/:name', getCharacterByName)
characterRouter.get('', getAllCharacter)

module.exports = characterRouter;