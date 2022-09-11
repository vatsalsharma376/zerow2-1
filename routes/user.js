import express from "express";

import { Login, Register } from "../controller/auth.js";
import { addDonation, deleteDonation, getDonations } from "../controller/main.js";

const router = express.Router();

// router.get("/", getPosts);
// router.post("/", createPost);

router.post("/login", Login);
router.post("/register", Register);
router.post("/addDonation", addDonation);
router.post("/deleteDonation", deleteDonation);
router.get("/getDonations",getDonations);
export { router };
