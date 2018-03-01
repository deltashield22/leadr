const router = require('express').Router()
const Latin = require('../models/latin')
const validateBody = require('../filters/validate.body')
const latinController = require('../controllers/latin.controller')

module.exports = router;

router.get('/', latinController.readAll);
router.post('/', validateBody(Latin), latinController.create);
router.put('/:id([0-9a-fA-F]{24})', validateBody(Latin), latinController.update);
router.delete('/:id([0-9a-fA-F]{24})', latinController.delete);