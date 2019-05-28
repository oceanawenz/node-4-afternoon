const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query;
        //if category is not found
        if(!category) {
            //return status with the entire swag array
            res.status(200).send(swag);
        } else {
            //else if category is found, filter the swag array by the category and return the filtered swag array
            const filteredSwag = swag.filter(swag => swag.category === category);
            res.status(200).send(filteredSwag);
        }
    }

}