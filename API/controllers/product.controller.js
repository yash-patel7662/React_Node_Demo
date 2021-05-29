const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const httpStatus = require('http-status');
const db = require('../server')
const productColl = db.collection("product")
const moment = require('moment')
const { ObjectID } = require('mongodb');
require('dotenv').config();

const createProduct = async (req, res, next) => {
    try {
        const data = req.body
        data.createdAt = moment().utc().format("YYYY-MM-DD hh:mm:ss");

        const insertData = await productColl.insertOne(data);
        let obj = resPattern.successPattern(httpStatus.OK, insertData.ops[0], 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const listAllProduct = async (req, res, next) => {
    try {
        const allProducts = await productColl.aggregate([
            {
                $lookup:
                {
                    from: 'category',
                    localField: 'Category',
                    foreignField: '_id',
                    as: 'productdetails'
                }
            }
        ]).toArray();
        let obj = resPattern.successPattern(httpStatus.OK, allProducts, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const editProduct = async (req, res, next) => {
    try {
        const productId = ObjectID(req.params.id)
        const data = req.body

        await productColl.findOneAndUpdate({ _id: productId }, { $set: data })
        let message = "Data Updated Successfully!!"
        let obj = resPattern.successPattern(httpStatus.OK, message, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const productId = ObjectID(req.params.id)
        const productData = await productColl.findOne({ _id: productId })

        if (!productData) {
            const message = `Product Not Found`;
            let obj = resPattern.successPattern(httpStatus.BAD_REQUEST, message);
            return res.status(obj.code).json(obj);
        }

        await productColl.deleteOne({ _id: productId })
        const message = `Product Deleted Successfuly`;
        let obj = resPattern.successPattern(httpStatus.OK, message, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    createProduct,
    listAllProduct,
    editProduct,
    deleteProduct
}