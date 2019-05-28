//this controller is responsible for logging in users, registering users, signing out users, and retreiving user info.

const users = require('../models/users')

let id = 1;


//here we will be exporting an object with a login, register, signout and getUser method.
module.exports = {
    register: (req, res, next) => {
        const { session } = req;
        //pull of username and password from the req body
        const { username, password } = req.body;

        //id username and password gets pushed from the new user object into the users array
        users.push({ id, username, password });
        //id icrements so the value of id can be unique
        id++
        //the value of the username from the request body gets set to session's user object
        session.user.username = username;
        //return the updated user object
        res.status(200).send(session.user);
    },

    login: (req, res, next) => {
        const { session } = req;
        const { username, password } = req.body;
        //finds if the username and password matches in the users array
        const user = users.find(user => user.username === username && user.password === password)
        //if user is found
        if (user) {
            //update the value of username on the request session user object to the value of username from the req body
            session.user.username = user.username;
            //send status with the updated user object 
            res.status(200).send(session.user)
        } else {
            //if user is not found
            res.status(500).send('Not Found. You shall not pass!!')
        }
    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).send(req.session);
    },
    getUser: (req, res, next) => {
        //reads the user object off of session
        const { session } = req;
        res.status(200).send(session.user);
    }

}