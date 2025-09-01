import IssueModel from "../models/issuesModel.js";
import RepositoryModel from "../models/repoModel.js";
import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const createIssue = async (req, res) => {
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

    const repository = await RepositoryModel.findOne({owner: user._id});
    if(!repository){
        return res.status(404).json({
            message: "Repository not found!",
            success: false,
        });
    }

    const repoId = repository._id;

    const { title, description, status } = req.body;
    const newIssue = new IssueModel({
      title: title,
      description: description,
      status: status,
      repository: repoId,
    });

    const issue = await newIssue.save();

    repository.issues.push(issue);
    const updatedRepo = await repository.save();

    return res.status(200).json({
      message: "Issue created successfully!",
      success: true,
      issue: issue,
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

export const updateIssueById = async (req, res) => {
  try {
    const issueId = req.params.id;
    const issue = await IssueModel.findById(issueId).populate('repository');
    if(!issue){
      return res.status(404).json({
        message: "Issue not found!",
        success: false
      })
    }
    const {title, description, status} = req.body;
    if(title && title !== issue.title){
      issue.title = title;
    }
    if(description && description !== issue.description){
      issue.description = description;
    }
    if(status && status !== issue.status){
      issue.status = status;
    }
    const updatedIssue = await issue.save();

    res.status(200).json({
      message: "Issue updated successfully!",
      success: true,
      updatedIssue: updatedIssue
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    })
  }
};

export const deleteIssueById = async (req, res) => {
  try {
    const issueId = req.params.id;
    const deletedIssue = await IssueModel.findByIdAndDelete(issueId);
    if(!deletedIssue){
      return res.status(404).json({
        message: "Issue not found!",
        success: false
      })
    }

    res.status(200).json({
      message: "Issue deleted successfully!",
      success: true,
      deletedIssue: deletedIssue
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    })
  }
};

export const getAllIssues = async (req, res) => {
  try {
    // const token = req.headers.authorization;
    // if (!token) {
    //   return res.status(404).json({
    //     message: "Unauthorize",
    //     success: false,
    //   });
    // }
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const user = await UserModel.findById(decoded.id);
    // if (!user) {
    //   return res.status(404).json({
    //     message: "User not found!",
    //     success: false,
    //   });
    // }

    const issues = await IssueModel.find();
    if(!issues){
      return res.status(404).json({
        message: "Issue not found!",
        success: false
      })
    }
    return res.status(200).json({
      message: "All issues fetched successfully!",
      success: true,
      issues: issues,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issueId = req.params.id;
    const issue = await IssueModel.findById(issueId).populate('repository');
    if(!issue){
      return res.status(404).json({
        message: "Issue not found!",
        success: false
      })
    }

    res.status(200).json({
      message: "Issue fetched successfully!",
      success: true,
      Issue: issue
    })
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message
    })
  }
};
