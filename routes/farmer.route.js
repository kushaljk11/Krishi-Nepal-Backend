import express from "express";
import { registerUser, loginUser } from "../controller/farmercontroller.js";

const farmerRouter = express.Router();

farmerRouter.post("/register", registerUser);
farmerRouter.post("/login", loginUser);

export default farmerRouter;
