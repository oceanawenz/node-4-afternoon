module.exports = function(req, res, next) {
    const { session } = req;

    //if the user object does not exist, add a user object to the session. call next so the request can reach the endpoint
    if( !session.user ) {
        session.user = { username: '', cart: [], total: 0};
    }
    next();
}