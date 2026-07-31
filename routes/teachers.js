const express = require('express');

const router = express.Router();

const studentsController = require('../controllers/students');

// add here when validation is complete
// const validation = require('../middleware/validation');

// delete comment when authenticate working
// const {isAuth} = require('../middleware/authenticate');

router.get('/', studentsController.getAll);
router.get('/:id', studentsController.getSingle);
router.post('/', studentsController.createItem);
router.put('/:id', studentsController.updateItem);
router.delete('/:id', studentsController.deleteItem);

module.exports = router;