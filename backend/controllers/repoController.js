import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import RepositoryModel from "../models/repoModel.js";

export const createRepositorie = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({
        message: "Unauthorize",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    const { name, description, content, visibility } = req.body;

    const newRepo = new RepositoryModel({
      name: name,
      description: description,
      content: content,
      visibility: visibility,
      owner: decoded.id,
    });

    const repo = await newRepo.save();
    user.repositories.push(repo);
    await user.save();
    return res.status(200).json({
      message: "Repository created successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getAllRepositories = async (req, res) => {
  try {

    const allRepos = await RepositoryModel.find().populate('owner').populate('issues');
    // console.log(allRepos);
    return res.status(200).json({
      message: "All repositories fetched successfully!",
      success: true,
      allRepos: allRepos,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getRepositoryById = async (req, res) => {
  try {

    const repoId = req.params.id;
    const repository = await RepositoryModel.findById(repoId).populate('owner').populate('issues');
    if(!repository){
        return res.status(404).json({
            message: "Repository not found",
            success: false
        })
    }

    return res.status(200).json({
        message: "Repository fetched successfully!",
        success: true,
        repository: repository
    })
  } catch (error) {
    res.status(500).json({
        message: "Internal server error", 
        success: false,
        error: error.message
    })
  }
};

export const getRepositoryByName = async (req, res) => {
  try {

    const name = req.params.name;
    const repository = await RepositoryModel.find({name}).populate('owner').populate('issues');
    if(!repository){
        return res.status(404).json({
            message: "Repository not found!",
            success: false
        })
    }
    return res.status(200).json({
        message: "Repository fetched successfully!",
        success: true,
        repository: repository
    })
  } catch (error) {
    res.status(500).json({
        message: "Internal server error", 
        success: false,
        error: error.message
    })
  }
};

export const fetchRepositoryForCurrentUser = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({
            message: "Unauthorize",
            success: false
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
 
    const repositories = await RepositoryModel.find({owner: decoded.id});
    if(!repositories){
        return res.status(404).json({
            message: "No repositories found for this user",
            success: false
        })
    }
    res.status(200).json({
        message: "Current repositories fetched successfully!",
        success: true,
        repositories
    })
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message
    })
  }
};

export const updateRepositoryById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({
            message: "Unauthorize",
            success: false
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const repoId = req.params.id;
    const repository = await RepositoryModel.findById(repoId);
    if(!repository){
        return res.status(404).json({
            message: "Repository not found!",
            success: false
        })
    }
    
    if(repository.owner.toString() !== decoded.id){
        return res.status(404).json({
            message: "You are not authorize to update this repository",
            success: false
        })
    }

    const {name, description, content, visibility} = req.body;
    if(name && name != repository.name){
        repository.name = name;
    }
    if(description && description != repository.description){
        repository.description = description;
    }
    if(content && content != repository.content){
        repository.content = content;
    }
    if(visibility && visibility != repository.visibility){
        repository.visibility = visibility;
    }
    const updatedRepo = await repository.save();

    res.status(200).json({
        message: "Repository updated successfully!",
        success: true,
        updatedRepo: updatedRepo
    })
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message
    })
  }
};

export const deleteRepositoryById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if(!token){
        return res.status(400).json({
            message: "Unauthorize",
            success: false
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const repoId = req.params.id;
    const repository = await RepositoryModel.findById(repoId);
    if(!repository){
        return res.status(404).json({
            message: "Repository not found!",
            success: false
        })
    }

    if(repository.owner.toString() !== decoded.id){
        return res.status(400).json({
            message: "You are not authorize to delete this repository",
            success: false
        })
    }
    const deletedRepo = await RepositoryModel.findByIdAndDelete(repoId);

    const user = await UserModel.findById(decoded.id);
    user.repositories = user.repositories.filter((repo) => repo.toString() !== repoId);
    await user.save();

    res.status(200).json({
        message: "Repository deleted successfully!",
        success: true,
        deletedRepo: deletedRepo
    })
  } catch (error) {
    res.status(500).json({
        message: "Internal server error",
        success: false,
        error: error.message
    })
  }
};

export const toggleVisibilityById = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(404).json({
        message: "Unauthorize",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const repoId = req.params.id;
    const repository = await RepositoryModel.findById(repoId);
    if (!repository) {
      return res.status(404).json({
        message: "Repository not found!",
        success: false,
      });
    }
    if (repository.owner.toString() !== decoded.id) {
      return res.status(404).json({
        message: "You are not authorize to toggle visibility of this repository",
        success: false,
      });
    }
    repository.visibility = repository.visibility === "public" ? "private" : "public";
    const updatedRepo = await repository.save();
    res.status(200).json({
      message: "Repository visibility toggled successfully!",
      success: true,
      updatedRepo: updatedRepo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
