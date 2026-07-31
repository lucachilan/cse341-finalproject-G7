const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
        const result = await mongodb.getDb().collection('teachers').find();
        result.toArray().then((teachers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(teachers);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving teachers.' });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
        const itemId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('teachers').find({ _id: itemId });
        result.toArray().then((teacher) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(teacher[0]);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the teacher.' });
    }
};

const deleteItem = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
        const itemId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('teachers').deleteOne({ _id: itemId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Something went wrong deleting the teacher');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the teacher.' });
    }
}

const createItem = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
        const item = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department,
            hireDate: req.body.hireDate,
            yearsExperience: req.body.yearsExperience,
            status: req.body.status
        }

        const response = await mongodb.getDb().collection('teachers').insertOne(item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't create this teacher");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the teacher.' });
    }
}

const updateItem = async (req, res) => {
    //#swagger.tags=['Teachers']
    try {
        const itemId = new ObjectId(req.params.id);
        const item = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department,
            hireDate: req.body.hireDate,
            yearsExperience: req.body.yearsExperience,
            status: req.body.status
        }
        const response = await mongodb.getDb().collection('teachers').replaceOne({ _id: itemId }, item);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "We couldn't update this teacher");
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the teacher.' });
    }
}

module.exports = {
    getAll,
    getSingle,
    deleteItem,
    updateItem,
    createItem
}
