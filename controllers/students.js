const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const result = await mongodb.getDb().collection('students').find();
        result.toArray().then((students) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(students);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving students.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const itemId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('students').find({ _id: itemId });
        result.toArray().then((student) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(student[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the student.' });
    }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const itemId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('students').deleteOne({ _id: itemId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong deleting the student');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the student.' });
    }
}

const createItem = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const item = {
            studentId: req.body.studentId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gradeLevel: req.body.gradeLevel,
            dateOfBirth: req.body.dateOfBirth,
            enrollmentDate: req.body.enrollmentDate,
            status: req.body.status
        }

        const response = await mongodb.getDb().collection('students').insertOne(item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't create this student");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the student.' });
    }
}

const updateItem = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const itemId = new ObjectId(req.params.id);
        const item = {
            studentId: req.body.studentId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gradeLevel: req.body.gradeLevel,
            dateOfBirth: req.body.dateOfBirth,
            enrollmentDate: req.body.enrollmentDate,
            status: req.body.status
        }
        const response = await mongodb.getDb().collection('students').replaceOne({ _id: itemId }, item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't update this student");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the student.' });
    }
}

module.exports = {
    getAll,
    getSingle,
    deleteItem,
    updateItem,
    createItem
}
