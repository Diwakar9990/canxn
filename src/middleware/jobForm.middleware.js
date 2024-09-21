import { body, validationResult } from 'express-validator'

export const validateRequest = async (req, res, next) => {
    //Setup rules
    const rules = [
        body('title').notEmpty().withMessage('Job title is required'),
        body('company').notEmpty().withMessage('Company name is required'),
        body('location').notEmpty().withMessage('Job location is required'),
        body('salary').notEmpty().withMessage('Salary is required'),
        body('date').notEmpty().withMessage('Date is required'),
        body('openings').isInt({ gt: 0, lt: 5 }).withMessage('Can be between 0 and 5'),
        body('skill').notEmpty().withMessage('please select atleast one skill')
    ]

    // run those rules
    await Promise.all(rules.map(rule => rule.run(req)));

    // check if there are any errors after running the rules.
    var validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
        return res.render('addJobs', {
            errorMessage:
                validationErrors.array()[0].msg,
        });
    }
    next();

};