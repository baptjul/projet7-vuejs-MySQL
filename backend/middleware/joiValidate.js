
const joiValidate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            res.status(422).json(`Validation error: ${error.details.map(i => i.message).join(', ')}`)
        }
        else {
            req.body = value;
            next();
        }
    }
}

module.exports = joiValidate;
