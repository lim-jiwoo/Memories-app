// * Middleware 
// Func looks very similar to controllers, but it has 'next' which means do sth and move to the next. 

import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        // After the user is signed in/up, they get a specific token, and if they want to do sth,
        // we need to check if their token is valid. 
        const token = req.headers.authorization.split(" ")[1];
        // If our custom token/Google token
        const isCustomAuth = token.length < 500;

        let decodedData; // Data we want to get from the token itself.

        if(token && isCustomAuth) { // If custom token
            decodedData = jwt.verify(token, process.env.SECRET_KEY); // Gives data from ea. token(user name, id). 2nd param is the secret string.
        
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.id; // sub = Google specific id that differentiates every single Google user. 
        }

        next(); // So we can pass the action onto the second thing. 
        // For instance, when user wants to like a post:
        // click the like button => doesn't immediately like post. auth middleware verifies if user is valid. next => call like controller !
        // Use in the 'routes'
        // 'Middleware' is something that happens in the middle. 
        // If you cal middleware before an action(ex. controller) you can populate the req and the next action can access it. 
        // Thus, userId populated here can be accessed by the next controller in the row(ex. likePost) later.
    } catch (error) {
        console.log(error);
    }
}
 
export default auth;