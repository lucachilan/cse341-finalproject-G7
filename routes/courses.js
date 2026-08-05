const express = require('express');

const router = express.Router();

const coursesController = require('../controllers/courses');

// add here when validation is complete
// const validation = require('../middleware/validation');

// delete comment when authenticate working
// const {isAuth} = require('../middleware/authenticate');

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.getSingle);
router.post('/', coursesController.createItem);
router.put('/:id', coursesController.updateItem);
router.delete('/:id', coursesController.deleteItem);

module.exports = router;