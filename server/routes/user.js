import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/user.js";

router.post("/signin", signin);// POST cuz we're sending data from front to the back!
router.post("/signup", signup);

export default router;