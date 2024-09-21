import { body, validationResult } from 'express-validator'

export const validateUser = async (req, res, next) => {
    //Setup rules
    const rules = [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid Email is required'),
        body('password').notEmpty().withMessage('Password is required'),

    ]

    // run those rules
    await Promise.all(rules.map(rule => rule.run(req)));

    // check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
        return res.render('userRegister', {
            errorMessage:
                validationErrors.array()[0].msg,
        });
    }
    next();
};