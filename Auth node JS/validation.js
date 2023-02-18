const joi = require('@hapi/joi');

//validation

const SignupValidation = data => {
    const schema = joi.object({
        name : joi.string().min(6).required(),
        email : joi.string().min(8).required().email(),
        password : joi.string().min(8).required(),
    });
    return schema.validate(data,{
        abortEarly : false,
    });
};

const LoginValidation = data => {
    const schema = joi.object({
        email : joi.string().min(8).required().email(),
        password : joi.string().min(8).required(),
    });
    return schema.validate(data,{
        abortEarly : false,
    });
};

module.exports.SignupValidation = SignupValidation ;
module.exports.LoginValidation = LoginValidation ;
