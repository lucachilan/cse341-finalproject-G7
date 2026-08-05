const express = require('express');

const router = express.Router();

const classesController = require('../controllers/classes');

// add here when validation is complete
// const validation = require('../middleware/validation');

// delete comment when authenticate working
// const {isAuth} = require('../middleware/authenticate');

router.get('/', classesController.getAll);
router.get('/:id', classesController.getSingle);
router.post('/', classesController.createItem);
router.put('/:id', classesController.updateItem);
router.delete('/:id', classesController.deleteItem);

module.exports = router;