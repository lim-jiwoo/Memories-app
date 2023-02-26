import bcrypt from 'bcryptjs'; // To hash password
import jwt from 'jsonwebtoken'; // Safe way to store user in the browser for some period of time

import User from '../models/user.js';

export const signin = async (req, res) => {
    // Whenever you have a POST req, you get all the data through the req body. 
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email }); // Find the old user in the db.

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password); // Password is hasehd, so need to use bcrypt

        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // Get JSON web token we can send to frontend. 
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.SECRET_KEY, { expiresIn: "1h" }); // 2nd argument is secret stirng only I know (usually kept in .env file)
        // Return result
        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email }); // Cannot create if there is an existing user.

        if(existingUser) return res.status(400).json({ message: "User already exists" });

        if(password !== confirmPassword) res.status(400).json({ message: "Passwords don't match" });

        const hashedPassword = await bcrypt.hash(password, 12); // 2nd param("salt") is level of difficulties of hashing. Normally, 12.

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
        
        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, { expiresIn: "1h" }); // If expires, logout and login again in the browser.
        
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}