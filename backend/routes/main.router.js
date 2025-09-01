import express from "express";
import userRoute from "./user.router.js";
import repoRoute from "./repo.router.js";
import issueRoute from "./issue.router.js";

const router = express.Router();

router.use('/users', userRoute);
router.use('/repo', repoRoute);
router.use('/issue', issueRoute);

router.get("/", (req, res)=>{
    res.send("Welcome to the main route!");
})

export default router;