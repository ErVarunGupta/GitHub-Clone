import Joi from 'joi';

// User validation schema
export const SignupValidation = (req, res, next) => {
    const user = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    })
    const {error} = user.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Invalid input",
            success: false,
            error: error.details[0].message
        })
    }

    next();
};

// Login validation schema
export const LoginValidation = (req, res, next) =>{ 
    const user = Joi.object({
        identifier: Joi.string().required(), // can be username or email
        password: Joi.string().min(3).required(),
    })

    const {error} = user.validate(req.body);
    if(error){
        return res.status(400).json({
            message: "Invalid input",
            success: false,
            error: error.details[0].message
        })
    }

    next();
};

