import express from "express";
import { createIssue, deleteIssueById, getAllIssues, getIssueById, updateIssueById } from "../controllers/issueController.js";

const router = express.Router();

router.post('/create', createIssue);
router.put('/update/:id', updateIssueById);
router.delete('/delete/:id', deleteIssueById);
router.get('/all', getAllIssues);
router.get('/:id', getIssueById);

export default router;