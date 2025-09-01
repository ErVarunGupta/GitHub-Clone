import express from "express";
import { deleteUserProfile, getAllUsers, getUserProfile, LoginController, SignupController, updateUserProfile } from "../controllers/userController.js";
import { LoginValidation, SignupValidation } from "../middlewares/userValidation.js";
const router = express.Router();

router.post('/signup', SignupValidation, SignupController);
router.post('/login', LoginValidation, LoginController);

router.get('/allUsers', getAllUsers);
router.get('/userProfile', getUserProfile)
router.delete('/deleteProfile', deleteUserProfile);
router.put('/updateProfile', updateUserProfile);

export default router;
