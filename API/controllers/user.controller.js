const APIError = require('../helpers/APIError');
const resPattern = require('../helpers/resPattern');
const httpStatus = require('http-status');
const db = require('../server')
const userColl = db.collection("user")
const moment = require('moment')
const { generatePassword } = require('../helpers/commonfile')
const { ObjectID } = require('mongodb');
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config();
let { mongoUrl } = process.env;
const axios = require('axios')


const createUser = async (req, res, next) => {
    try {
        const requestdata = { email: req.body.email };
        const userEmail = await userColl.findOne(requestdata)
        if (userEmail) {
            const message = `You have already registered with email`;
            const obj = resPattern.successPattern(httpStatus.BAD_REQUEST, message);
            return res.status(obj.code).json(obj);
        }
        const data = req.body
        data.createdAt = moment().utc().format("YYYY-MM-DD hh:mm:ss");
        data.password = generatePassword(req.body.password)
        data.type = "User"

        const insertData = await userColl.insertOne(data);
        let obj = resPattern.successPattern(httpStatus.OK, insertData.ops[0], 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const listAllUsers = async (req, res, next) => {
    try {
        const allUsers = await userColl.find({ type: "User" }).toArray();
        let obj = resPattern.successPattern(httpStatus.OK, allUsers, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const editUser = async (req, res, next) => {
    try {
        const userId = ObjectID(req.params.id)
        const data = req.body

        await userColl.findOneAndUpdate({ _id: userId }, { $set: data })
        let message = "Data Updated Successfully!!"
        let obj = resPattern.successPattern(httpStatus.OK, message, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = ObjectID(req.params.id)
        const userData = await userColl.findOne({ _id: userId })

        if (!userData) {
            const message = `User Not Found`;
            let obj = resPattern.successPattern(httpStatus.BAD_REQUEST, message);
            return res.status(obj.code).json(obj);
        }

        await userColl.deleteOne({ _id: userId })
        const message = `User Deleted Successfuly`;
        let obj = resPattern.successPattern(httpStatus.OK, message, 'Success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

const login = async (req, res, next) => {
    try {
        const { password } = req.body;
        const requestdata = { email: req.body.email }
        const userData = await userColl.findOne(requestdata)

        if (!userData || userData.password == null) {
            const message = `Incorrect email or password.`;
            let obj = resPattern.successPattern(httpStatus.BAD_REQUEST, message);
            return res.status(obj.code).json(obj);
        }

        const isMatch = await bcrypt.compare(password, userData.password)
        if (isMatch) {
            const message = `Login SuccessFully`;
            const token = JWT.sign({ _id: userData._id }, process.env.JWT_SECRET)
            const type = userData.type;
            let obj = resPattern.successPattern(httpStatus.OK, { message, token, type }, 'Success');
            return res.status(obj.code).json(obj);
        } else {
            const message = `Password Incorrect`;
            let obj = resPattern.successPattern(httpStatus.BAD_REQUEST, message);
            return res.status(obj.code).json(obj);
        }
    } catch (e) {
        return next(new APIError(`${e.message}`, httpStatus.BAD_REQUEST, true));
    }
}

module.exports = {
    createUser,
    listAllUsers,
    editUser,
    deleteUser,
    login
}