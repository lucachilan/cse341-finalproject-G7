const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/courses', require('./courses'));
router.use('/classes', require('./classes'));
router.use('/students', require('./students'));
router.use('/teachers', require('./teachers'));

module.exports = router;
