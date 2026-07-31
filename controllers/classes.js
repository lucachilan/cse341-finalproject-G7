const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const result = await mongodb.getDb().collection('classes').find();
        result.toArray().then((classes) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(classes);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving classes.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const itemId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('classes').find({ _id: itemId });
        result.toArray().then((classItem) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(classItem[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the class.' });
    }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const itemId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('classes').deleteOne({ _id: itemId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong deleting the class');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the class.' });
    }
}

const createItem = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const item = {
            classCode: req.body.classCode,
            teacherId: req.body.teacherId,
            courseId: req.body.courseId,
            classroom: req.body.classroom,
            schedule: req.body.schedule,
            semester: req.body.semester,
            students: req.body.students
        }

        const response = await mongodb.getDb().collection('classes').insertOne(item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't create this class");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the class.' });
    }
}

const updateItem = async (req, res) => {
    //#swagger.tags=['Classes']
    try {
        const itemId = new ObjectId(req.params.id);
        const item = {
            classCode: req.body.classCode,
            teacherId: req.body.teacherId,
            courseId: req.body.courseId,
            classroom: req.body.classroom,
            schedule: req.body.schedule,
            semester: req.body.semester,
            students: req.body.students
        }
        const response = await mongodb.getDb().collection('classes').replaceOne({ _id: itemId }, item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't update this class");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the class.' });
    }
}

module.exports = {
    getAll,
    getSingle,
    deleteItem,
    updateItem,
    createItem
}
