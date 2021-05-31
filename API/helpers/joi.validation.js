const Joi = require('joi')

const userParamsValidation = {
	createUser: {
		body: {
			email: Joi.string().required(),
			password: Joi.string().required(),
			gender: Joi.string().required(),
            DOB: Joi.string().required(),
            hobbies: Joi.string().required()
		}
	}
};
 
module.exports = {
    userParamsValidation
}