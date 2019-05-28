//responsible for adding items to user's cart and removing from user's cart. handles checkout process
const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.params;
        let { user } = req.session;
        // This will return -1 if it isnt in the cart
        const index = user.cart.findIndex(swag => swag.id == id);
        
        //if item is not in cart
        if (index === -1) {
            // if the swag id value is found, set it to a variable called selectedSwag
            const selectedSwag = swag.find(swag => swag.id == id);
            //then push the selectedSwag to the user cart
            user.cart.push(selectedSwag);
            //increase the user total by the price of the selectedSwag
            user.total += selectedSwag.price;
        }
        res.status(200).send(user)
    },

    remove: (req, res, next) => {
        const { id } = req.params;
        const { user } = req.session;

        //cart will find the index of the swag.id and set it to a var called index.
        const index = user.cart.findIndex(swag => swag.id == id);
        //swag.find will find the value of the id that matches the id of the item to be selected and deleted
        const selectedSwag = swag.find(swag => swag.id == id);

        if (index !== -1) {
            //remove item from user cart
            user.cart.splice(index, 1);
            //decrease the user total by the price of the selectedSwag
            user.total -= selectedSwag.price
        }
        res.status(200).send(user);
    },

    checkout: (req, res, next) => {
        const { user } = req.session;
        //reset the user cart to an empty array
        user.cart = [];
        // reset the user total to 0
        user.total = 0;
        res.status(200).send(user)
    }
}