const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const httpStatus = require('http-status');
const db = require('../server')
const categoryColl = db.collection("category")
const moment = require('moment')
const { ObjectID } = require('mongodb');
require('dotenv').config();

const createCategory = async (req, res, next) => {
    try {
        const data = req.body
        data.createdAt = moment().utc().format("YYYY-MM-DD hh:mm:ss");

        const insertData = await categoryColl.insertOne(data);
        let obj = resPattern.successPattern(httpStatus.OK, insertData.ops[0], 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const listAllCategory = async (req, res, next) => {
    try {
        const allCategory = await categoryColl.find({}).aggregate([
            {
                $lookup:
                {
                    from: 'product',
                    localField: '_id',
                    foreignField: 'Category',
                    as: 'productdetails'
                }
            }
        ]).toArray();
        let obj = resPattern.successPattern(httpStatus.OK, allCategory, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const editCategory = async (req, res, next) => {
    try {
        const categoryId = ObjectID(req.params.id)
        const data = req.body

        await categoryColl.findOneAndUpdate({ _id: categoryId }, { $set: data })
        let message = "Data Updated Successfully!!"
        let obj = resPattern.successPattern(httpStatus.OK, message, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = ObjectID(req.params.id)
        const categoryData = await categoryColl.findOne({ _id: categoryId })

        if (!categoryData) {
            const message = `Category Not Found`;
            let obj = resPattern.successPattern(httpStatus.BAD_REQUEST, message);
            return res.status(obj.code).json(obj);
        }

        await categoryColl.deleteOne({ _id: categoryId })
        const message = `Category Deleted Successfuly`;
        let obj = resPattern.successPattern(httpStatus.OK, message, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    createCategory,
    listAllCategory,
    editCategory,
    deleteCategory
}