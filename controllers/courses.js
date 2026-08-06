const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const result = await mongodb.getDb().collection('courses').find();
        result.toArray().then((courses) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(courses);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving courses.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Courses']
    try {

        const itemId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDb()
            .collection('courses')
            .findOne({ _id: itemId });

        if (!result) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({
            message: err.message || "Some error occurred while retrieving the course."
        });
    }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const itemId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('courses').deleteOne({ _id: itemId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong deleting the course');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the course.' });
    }
}

const createItem = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const item = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            description: req.body.description,
            department: req.body.department,
            credits: req.body.credits,
            semester: req.body.semester,
            capacity: req.body.capacity
        }

        const response = await mongodb.getDb().collection('courses').insertOne(item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't create this course");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the course.' });
    }
}

const updateItem = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const itemId = new ObjectId(req.params.id);
        const item = {
            courseCode: req.body.courseCode,
            courseName: req.body.courseName,
            description: req.body.description,
            department: req.body.department,
            credits: req.body.credits,
            semester: req.body.semester,
            capacity: req.body.capacity
        }
        const response = await mongodb.getDb().collection('courses').replaceOne({ _id: itemId }, item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't update this course");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the course.' });
    }
}

module.exports = {
    getAll,
    getSingle,
    deleteItem,
    updateItem,
    createItem
}
