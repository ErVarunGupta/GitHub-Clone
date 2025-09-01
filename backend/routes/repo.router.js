import express from 'express';
import { createRepositorie, deleteRepositoryById, fetchRepositoryForCurrentUser, getAllRepositories, getRepositoryById, getRepositoryByName, toggleVisibilityById, updateRepositoryById } from '../controllers/repoController.js';

const router = express.Router();

router.post('/create', createRepositorie);
router.get('/all', getAllRepositories);
router.get('/userId/:id', getRepositoryById);
router.get('/name/:name', getRepositoryByName);
router.get('/getCurrRepos', fetchRepositoryForCurrentUser);
router.put('/update/:id', updateRepositoryById);
router.delete('/delete/:id', deleteRepositoryById);
router.patch('/toggle/:id', toggleVisibilityById);

export default router;